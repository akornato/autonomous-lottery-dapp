import React from "react";
import { NextPage } from "next";
import { provider } from "@constants/ethers";

type Props = {
  blockNumber: number;
};

const HomePage: NextPage<Props> = ({ blockNumber }) => {
  return <div>Current block number: {blockNumber}</div>;
};

HomePage.getInitialProps = async ({ req }) => {
  const blockNumber = await provider.getBlockNumber();
  return { blockNumber };
};

export default HomePage;
