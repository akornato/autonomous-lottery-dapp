import React, { useContext, createContext } from "react";

export type StoreProps = { blockNumber: number };
type StoreValue = { blockNumber: number };

const StoreContext = createContext<StoreValue>(undefined!);

export const StoreProvider: React.FC<StoreValue> = ({
  children,
  blockNumber,
}) => {
  return (
    <StoreContext.Provider value={{ blockNumber }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
