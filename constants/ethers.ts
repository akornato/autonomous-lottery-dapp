import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const provider =
  typeof window !== "undefined" && window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider(
        `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      );

export const signer =
  typeof window !== "undefined" && window.ethereum
    ? provider.getSigner()
    : null;
