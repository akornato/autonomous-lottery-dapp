import React, { useContext, createContext } from "react";

type Store = {};

const StoreContext = createContext<Store>(undefined!);

export const StoreProvider: React.FC = ({ children }) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
