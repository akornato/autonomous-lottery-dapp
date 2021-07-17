import React, { useState, useEffect, useContext, createContext } from "react";
import { provider, contractNoSigner } from "@constants/ethers";
import type { Signer, BigNumber } from "ethers";
import type { Lottery } from "../typechain";

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
  const [signerBalance, setSignerBalance] = useState<BigNumber>();

  const connect = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setSignerAddress(await signer.getAddress());
      setSignerBalance(await signer.getBalance());
      setContract(contract.connect(signer));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    connect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StoreContext.Provider
      value={{
        ...storeInitProps,
        connect,
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
