import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { provider, contract } from "@constants/ethers";
import { StoreProvider, StoreInitProps } from "@hooks/useStore";
import "tailwindcss/tailwind.css";

type AppWithStoreProps = AppProps & { storeInitProps: StoreInitProps };

const AppWithStore = ({
  Component,
  pageProps,
  storeInitProps,
}: AppWithStoreProps) => {
  return (
    <StoreProvider {...storeInitProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

// This disables the ability to perform automatic static optimization,
// causing every page in your app to be server-side rendered.

AppWithStore.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const blockNumber = await provider.getBlockNumber();
  const currentRound = await contract
    .getCurrentRound()
    .then((bigNumber) => bigNumber.toNumber());

  const rounds = await contract.getRounds();
  const players = await contract.getPlayers();
  const payouts = await contract.getPayouts();

  const storeInitProps = {
    blockNumber,
    currentRound,
    rounds,
    players,
    payouts,
  };
  return { ...appProps, storeInitProps };
};

export default AppWithStore;
