import React, { useState, useContext, createContext } from "react";
import { provider, contract } from "@constants/ethers";
import type { Signer, BigNumber } from "ethers";

export type StoreInitProps = {
  blockNumber: number;
  currentRound: number;
  rounds: number[];
  players: string[][];
  payouts: number[];
};

type StoreValue = StoreInitProps & {
  connect: () => void;
  signer?: Signer;
  signerAddress?: string;
  signerBalance?: BigNumber;
};

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreInitProps> = ({
  children,
  ...storeInitProps
}) => {
  const [signer, setSigner] = useState<Signer>();
  const [signerAddress, setSignerAddress] = useState<string>();
  const [signerBalance, setSignerBalance] = useState<BigNumber>();

  const connect = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setSignerAddress(await signer.getAddress());
      setSignerBalance(await signer.getBalance());
      contract.connect(signer);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        ...storeInitProps,
        connect,
        signer,
        signerAddress,
        signerBalance,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
