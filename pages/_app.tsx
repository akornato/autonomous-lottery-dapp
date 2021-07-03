import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { provider } from "@constants/ethers";
import { StoreProvider, StoreProps } from "@hooks/useStore";

type AppWithStoreProps = AppProps & StoreProps;

const AppWithStore = ({
  Component,
  router,
  pageProps,
  ...storeProps
}: AppWithStoreProps) => {
  return (
    <StoreProvider {...storeProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

// This disables the ability to perform automatic static optimization,
// causing every page in your app to be server-side rendered.

AppWithStore.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const blockNumber = await provider.getBlockNumber();

  return { ...appProps, blockNumber };
};

export default AppWithStore;
