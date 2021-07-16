import React, { useContext, createContext } from "react";
import type { Lottery } from "../typechain";

export type StoreInitProps = {
  blockNumber: number;
  contract: Lottery;
  currentRound: number;
  rounds: number[];
  players: string[][];
  payouts: number[];
};
type StoreValue = StoreInitProps;

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreInitProps> = ({
  children,
  ...storeInitProps
}) => {
  return (
    <StoreContext.Provider value={{ ...storeInitProps }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
