import React from "react";
import { NextPage } from "next";
import { useStore } from "@hooks/useStore";

const HomePage: NextPage = () => {
  const { blockNumber } = useStore();
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div>
        <p>Current block number: {blockNumber}</p>
        <p>Current lottery id: {Math.floor(blockNumber / 100) * 100}</p>
      </div>
    </div>
  );
};

export default HomePage;
