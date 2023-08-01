import { ExternalProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

export const MetaMaskConect = () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as unknown as ExternalProvider
      );

      window.ethereum.on("accountChanged", MetaMaskConect);

      return provider;
    } catch (err) {
      console.error("Error connecting to MetaMask", err);
    }
  } else {
    throw new Error("MetaMask not detected");
  }
};
