import { Contract, ethers } from "ethers";
import { contractConection } from "./contractConection";

class MyShop {
  myShopAction: Contract | undefined;
  constructor() {
    this.myShopAction = contractConection();
  }

  getTokenBalance = async () => {
    try {
      const tokenBalance = await this.myShopAction?.tokenBalance();
      return tokenBalance;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  getUserBalance = async () => {
    try {
      const userBalance = await this.myShopAction?.senderBalance();
      return userBalance;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  getERC721Balance = async () => {
    try {
      const ERC721Balance = await this.myShopAction?.getERC721Balance();
      return ERC721Balance;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  getERC1155Balance = async (id: number) => {
    try {
      const ERC1155Balance = await this.myShopAction?.getERC1155Balance(id);
      return ERC1155Balance;
    } catch (err) {
      throw new Error(err as string);
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

  buyTokens = async (value: number) => {
    if (typeof window.ethereum !== "undefined") {
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      try {
        const tx = await this.myShopAction?.buy({
          value: ethers.utils.parseUnits(`${value}`, 0),
        });

        await tx.wait();
      } catch (error) {
        console.error(error);
      }
    }
  };
  sellTokens = async (value: number) => {
    if (typeof window.ethereum !== "undefined") {
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      try {
        const tx = await this.myShopAction?.sell(value);

        await tx.wait();
      } catch (error) {
        console.error(error);
      }
    }
  };
}

export const myShopService = new MyShop();
