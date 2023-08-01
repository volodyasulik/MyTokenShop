import { ethers } from "ethers";
import { MetaMaskConect } from "./conectToMetaMask";
import { MYSHOP_ADDRESS } from "../const/address.const";
import { abi } from "../../../artifacts/contracts/Shops/MyERC20Shop.sol/MyShop.json";

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
