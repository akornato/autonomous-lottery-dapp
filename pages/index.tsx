import React from "react";
import { NextPage } from "next";
import { useStore } from "@hooks/useStore";

const HomePage: NextPage = () => {
  const { blockNumber } = useStore();
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      Current block number: {blockNumber}
    </div>
  );
};

export default HomePage;
