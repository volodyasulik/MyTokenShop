import { Contract, ethers } from "ethers";
import { contractConection } from "./contractConection";

const HARDHAT_NETWORK_ID = "31337";

class MyShop {
  myShopAction: Contract | undefined;
  constructor() {
    this.myShopAction = contractConection();
  }

  getTokenBalance = async () => {
    if (!this._checkNetwork()) {
      return;
    }
    try {
      const tokenBalance = await this.myShopAction?.tokenBalance();
      return { tokenBalance };
    } catch (err) {
      console.log(err as Error);
    }
  };

  getUserBalance = async () => {
    if (!this._checkNetwork()) {
      return;
    }
    try {
      const userBalance = await this.myShopAction?.senderBalance();
      return { userBalance };
    } catch (err) {
      console.log(err as Error);
    }
  };

  aprove = async (value: number) => {
    try {
      await this.myShopAction?.approve(value);
    } catch (error) {
      console.error(error);
    }
  };

  mintERC721Token = async (tokenId: number, amount: number) => {
    try {
      await this.myShopAction?._mintERC721Token(tokenId, amount);
    } catch (error) {
      console.error(error);
    }
  };

  buyTokenst = async (value: number) => {
    try {
      const tx = await this.myShopAction?.buy({
        value: ethers.utils.parseUnits(`${value}`, 0),
      });

      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  _checkNetwork = () => {
    if (window.ethereum?.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }
    if (window.ethereum === undefined) {
      console.log("Please install Metamask!");
      return false;
    }
    console.error("Please connect to localhost:8545");
    return false;
  };
}

export const myShopService = new MyShop();
