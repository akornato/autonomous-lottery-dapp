import React from "react";
import { NextPage } from "next";
import { useStore } from "@hooks/useStore";

const HomePage: NextPage = () => {
  const { blockNumber, lotteryId, contract } = useStore();
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div>
        <p>Current block number: {blockNumber}</p>
        <p>Contract address: {contract.address}</p>
        <p>Current lottery id: {lotteryId}</p>
      </div>
    </div>
  );
};

export default HomePage;
