import { ethers } from "ethers";
import { MetaMaskConect } from "./conectToMetaMask";
import { MYSHOP_ADDRESS } from "../const/address.const";
import contractArtifact from "../contracts/MyShop.json";
const { abi } = contractArtifact;

export const contractConection = () => {
  try {
    let myShop;
    const provider = MetaMaskConect();
    if (provider) {
      myShop = new ethers.Contract(MYSHOP_ADDRESS, abi, provider.getSigner(0));
    }
    return myShop;
  } catch (err) {
    throw new Error("Contract not exist", err as Error);
  }
};
