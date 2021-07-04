import React, { useContext, createContext } from "react";

export type StoreInitProps = { blockNumber: number };
type StoreValue = { blockNumber: number; lotteryId: number };

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreInitProps> = ({
  children,
  blockNumber,
}) => {
  const lotteryId = Math.floor(blockNumber / 100) * 100;
  return (
    <StoreContext.Provider value={{ blockNumber, lotteryId }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
