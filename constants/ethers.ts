import { ethers } from "ethers";
import getConfig from "next/config";
import artifact from "../artifacts/contracts/Lottery.sol/Lottery.json";
import type { Lottery } from "../typechain";

const { NODE_ENV, CONTRACT_ADDRESS } = getConfig().publicRuntimeConfig;
const isDevelopment = NODE_ENV === "development";
declare global {
  interface Window {
    ethereum: any;
  }
}

let isomorphicProvider;

if (typeof window !== "undefined" && window.ethereum) {
  isomorphicProvider = new ethers.providers.Web3Provider(window.ethereum);
}
if (typeof window === "undefined") {
  if (isDevelopment) {
    isomorphicProvider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545"
    );
  } else {
    isomorphicProvider = new ethers.providers.JsonRpcProvider(
      `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    );
  }
}

export const provider = isomorphicProvider;

export const contractNoSigner = new ethers.Contract(
  CONTRACT_ADDRESS,
  artifact.abi,
  provider
) as Lottery;
