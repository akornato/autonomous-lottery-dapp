import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { ethers } from "ethers";
import { provider } from "@constants/ethers";
import { StoreProvider, StoreInitProps } from "@hooks/useStore";
import artifact from "../artifacts/contracts/Lottery.sol/Lottery.json";
import "tailwindcss/tailwind.css";

import type { Lottery } from "../typechain";
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
  const contract = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    artifact.abi,
    provider
  ) as Lottery;
  const currentRound = await contract
    .getCurrentRound()
    .then((bigNumber) => bigNumber.toNumber());

  const rounds = await contract.getRounds();
  const players = await contract.getPlayers();
  const payouts = await contract.getPayouts();

  const storeInitProps = {
    blockNumber,
    contract,
    currentRound,
    rounds,
    players,
    payouts,
  };
  return { ...appProps, storeInitProps };
};

export default AppWithStore;
