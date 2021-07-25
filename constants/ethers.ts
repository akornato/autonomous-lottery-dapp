import { ethers } from "ethers";
import getConfig from "next/config";
import artifact from "../artifacts/contracts/Lottery.sol/Lottery.json";
import type { Lottery } from "../typechain";

const { NODE_ENV, CONTRACT_ADDRESS_HARDHAT, CONTRACT_ADDRESS_RINKEBY } =
  getConfig().publicRuntimeConfig;
const isDevelopment = NODE_ENV === "development";
declare global {
  interface Window {
    ethereum: any;
  }
}

export const provider =
  typeof window !== "undefined" && window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : isDevelopment
    ? new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
    : new ethers.providers.JsonRpcProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      );

export const contractNoSigner = new ethers.Contract(
  isDevelopment ? CONTRACT_ADDRESS_HARDHAT : CONTRACT_ADDRESS_RINKEBY,
  artifact.abi,
  provider
) as Lottery;

export const roundDurationInBlocks = 10;
