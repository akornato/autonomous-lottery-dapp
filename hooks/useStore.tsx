import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { notification } from "antd";
import { ethers } from "ethers";
import { getProvider, getContractNoSigner } from "@constants/ethers";
import type { Signer } from "ethers";
import type { Lottery } from "../typechain";

export type StoreProps = {
  blockNumber: number;
  currentRoundStartingBlock: number;
  rounds: number[];
  players: string[][];
  payouts: string[];
  winners: string[];
};

type StoreValue = StoreProps & {
  connectWallet: () => void;
  signer?: Signer;
  signerAddress?: string;
  signerBalance?: string;
  contract: Lottery;
};

const StoreContext = createContext<StoreValue>(undefined!);

export const getStoreProps = async () => {
  const provider = getProvider();
  const contractNoSigner = getContractNoSigner();
  const [blockNumber, rounds, players, payouts] = await Promise.all([
    provider.getBlockNumber(),
    contractNoSigner
      .getRounds()
      .then((array) => array.map((bigNumber) => bigNumber.toNumber())),
    contractNoSigner.getPlayers(),
    contractNoSigner
      .getPayouts()
      .then((array) => array.map(ethers.utils.formatEther)),
  ]);

  const currentRoundStartingBlock = Math.floor((blockNumber + 1) / 10) * 10;

  const winners = await Promise.all(
    rounds.map((roundStartingBlock, roundIndex) =>
      roundStartingBlock < currentRoundStartingBlock
        ? contractNoSigner.getWinner(roundIndex)
        : null
    )
  );

  return {
    blockNumber,
    currentRoundStartingBlock,
    rounds,
    players,
    payouts,
    winners,
  };
};

export const StoreProvider: React.FC<StoreProps> = ({
  children,
  ...storeInitProps
}) => {
  const [storeProps, setStoreProps] = useState(storeInitProps);
  const updateStoreProps = useCallback(
    () => getStoreProps().then(setStoreProps),
    []
  );
  const [contract, setContract] = useState(getContractNoSigner());
  const [signer, setSigner] = useState<Signer>();
  const [signerAddress, setSignerAddress] = useState<string>();
  const [signerBalance, setSignerBalance] = useState<string>();

  const connectWallet = useCallback(async () => {
    try {
      const provider = getProvider();
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        setSignerAddress(await signer.getAddress());
        setSignerBalance(
          await signer.getBalance().then(ethers.utils.formatEther)
        );
        setContract(getContractNoSigner().connect(signer));
      } else throw { message: "Install MetaMask" };
    } catch (e) {
      notification.open({
        message: "Error",
        description: e.message,
      });
    }
  }, []);

  const newPlayerListener = useCallback(
    (roundStartingBlock, player, value) => {
      notification.open({
        key: `${roundStartingBlock}|${player}|${value}`,
        message: "New Player",
        description: `Round starting block: ${roundStartingBlock} | Player: ${player} | Value: ${ethers.utils.formatEther(
          value
        )} ETH`,
      });
      updateStoreProps();
    },
    [updateStoreProps]
  );

  const withdrawalListener = useCallback(
    (roundStartingBlock, winner, value) => {
      notification.open({
        key: `${roundStartingBlock}|${winner}|${value}`,
        message: "Withdrawal",
        description: `Round starting block: ${roundStartingBlock} | Winner: ${winner} | Value: ${ethers.utils.formatEther(
          value
        )} ETH`,
      });
      updateStoreProps();
    },
    [updateStoreProps]
  );

  useEffect(() => {
    if (signer) {
      // @ts-ignore
      window.ethereum.on("accountsChanged", connectWallet);
      // @ts-ignore
      window.ethereum.on("chainChanged", connectWallet);
    }
  }, [signer, connectWallet]);

  useEffect(() => {
    if (contract) {
      contract.on("NewPlayer", newPlayerListener);
      contract.on("Withdrawal", withdrawalListener);
    }
  }, [contract, newPlayerListener, withdrawalListener]);

  return (
    <StoreContext.Provider
      value={{
        ...storeProps,
        connectWallet,
        signer,
        signerAddress,
        signerBalance,
        contract,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
