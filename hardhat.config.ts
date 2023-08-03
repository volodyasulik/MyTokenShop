import { HardhatUserConfig, task, subtask } from "hardhat/config";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
import { GetBalanceArgs, MintArgs } from "./types";
import * as Validation from "./validation";
import { ContractTransaction } from "ethers";
import types from "./validation/hre-types";
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // localhost: {
    //   url: `http://127.0.0.1:8545/`,
    // },
    sepolia: {
      url: `https://late-lingering-leaf.ethereum-sepolia.discover.quiknode.pro/${process.env.SEPOLIA_APP_ID}/`,
      accounts: [`${process.env.OWNER_PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "ETH",
    gasPrice: 15,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
