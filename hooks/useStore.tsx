import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { provider, contractNoSigner } from "@constants/ethers";
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
  updateStoreProps: () => void;
  error?: Error;
  setError: (Error) => void;
  connectWallet: () => void;
  signer?: Signer;
  signerAddress?: string;
  signerBalance?: string;
  contract: Lottery;
};

const StoreContext = createContext<StoreValue>(undefined!);

export const getStoreProps = async () => {
  const [blockNumber, currentRoundStartingBlock, rounds, players, payouts] =
    await Promise.all([
      provider.getBlockNumber(),
      contractNoSigner
        .getCurrentRoundStartingBlock()
        .then((bigNumber) => bigNumber.toNumber()),
      contractNoSigner
        .getRounds()
        .then((array) => array.map((bigNumber) => bigNumber.toNumber())),
      contractNoSigner.getPlayers(),
      contractNoSigner
        .getPayouts()
        .then((array) => array.map(ethers.utils.formatEther)),
    ]);

  const winners = await Promise.all(
    rounds.map((roundStartingBlock, roundIndex) =>
      currentRoundStartingBlock === roundStartingBlock
        ? null
        : contractNoSigner.getWinner(roundIndex)
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
  const [error, setError] = useState<Error>();
  const [contract, setContract] = useState(contractNoSigner);
  const [signer, setSigner] = useState<Signer>();
  const [signerAddress, setSignerAddress] = useState<string>();
  const [signerBalance, setSignerBalance] = useState<string>();

  const connectWallet = async () => {
    setError(null);
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setSignerAddress(await signer.getAddress());
      setSignerBalance(
        await signer.getBalance().then(ethers.utils.formatEther)
      );
      setContract(contract.connect(signer));
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StoreContext.Provider
      value={{
        ...storeProps,
        updateStoreProps,
        error,
        setError,
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
