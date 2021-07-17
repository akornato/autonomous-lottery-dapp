import { ethers } from "ethers";
import artifact from "../artifacts/contracts/Lottery.sol/Lottery.json";
import type { Lottery } from "../typechain";

const { NODE_ENV } = process.env;
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

export const contract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  artifact.abi,
  provider
) as Lottery;
