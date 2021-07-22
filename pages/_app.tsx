import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { StoreProvider, StoreProps, getStoreProps } from "@hooks/useStore";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";

type AppWithStoreProps = AppProps & { storeInitProps: StoreProps };

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

  return { ...appProps, storeInitProps: await getStoreProps() };
};

export default AppWithStore;
