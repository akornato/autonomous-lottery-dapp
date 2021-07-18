import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import { provider, contractNoSigner } from "@constants/ethers";
import type { Signer, BigNumber } from "ethers";
import type { Lottery } from "../typechain";

export type StoreInitProps = {
  blockNumber: number;
  currentRound: number;
  rounds: number[];
  players: string[][];
  payouts: string[];
};

type StoreValue = StoreInitProps & {
  connectWallet: () => void;
  signer?: Signer;
  signerAddress?: string;
  signerBalance?: string;
  contract: Lottery;
};

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreInitProps> = ({
  children,
  ...storeInitProps
}) => {
  const [contract, setContract] = useState(contractNoSigner);
  const [signer, setSigner] = useState<Signer>();
  const [signerAddress, setSignerAddress] = useState<string>();
  const [signerBalance, setSignerBalance] = useState<string>();

  const connectWallet = async () => {
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
      console.log(e);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StoreContext.Provider
      value={{
        ...storeInitProps,
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
