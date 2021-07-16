import React, { useContext, createContext } from "react";
import type { Lottery } from "../typechain";

export type StoreInitProps = {
  blockNumber: number;
  contract: Lottery;
  roundId: number;
};
type StoreValue = StoreInitProps;

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreInitProps> = ({
  children,
  blockNumber,
  contract,
  roundId,
}) => {
  return (
    <StoreContext.Provider value={{ blockNumber, contract, roundId }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
