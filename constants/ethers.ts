import { ethers } from "ethers";

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

export const signer =
  typeof window !== "undefined" && window.ethereum
    ? provider.getSigner()
    : null;
