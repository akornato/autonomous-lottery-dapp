import React, { useContext, createContext } from "react";
import type { Lottery } from "../typechain";

export type StoreInitProps = {
  blockNumber: number;
  contract: Lottery;
  lotteryId: number;
};
type StoreValue = StoreInitProps;

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreInitProps> = ({
  children,
  blockNumber,
  contract,
  lotteryId,
}) => {
  return (
    <StoreContext.Provider value={{ blockNumber, contract, lotteryId }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
