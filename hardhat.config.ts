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
import { ERC721Service } from "./services";
import { ContractTransaction } from "ethers";
import types from "./validation/hre-types";
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("mint", "Mint token")
  .addParam("to", "Address of the account")
  .addParam("token", "Token id to mint")
  .setAction(async (args: MintArgs, hre) => {
    const parsedArgs = Validation.MintSchema.parse(args);

    const tx = await ERC721Service.mint(parsedArgs, hre);

    await hre.run("wait", { tx });
  });

task("getBalance", "Get user's tokens balance")
  .addParam("address", "Address of the account")
  .setAction(async (args: GetBalanceArgs, hre) => {
    const parsedArgs = Validation.GetBalanceSchema.parse(args);

    const tx = await ERC721Service.getBalance(parsedArgs, hre);
  });

subtask("wait", "Wait for transaction")
  .addParam("tx", "Transaction", undefined, types.tx)
  .setAction(async (args: { tx: ContractTransaction }) => {
    console.log(`Tx hash: ${args.tx.hash}`);

    await args.tx.wait();
  });

// Extend build-in methods with custom logic
task("compile").setAction(async (args, hre, runSuper) => {
  await runSuper(args);
  console.log("Compiled");
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: `http://127.0.0.1:8545/`,
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.GATEWAY_APP_ID}`,
    //   accounts: [`0x${process.env.DEPLOYER}`],
    // },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_APP_ID}`,
    //   accounts: [`0x${process.env.OWNER_PRIVATE_KEY}`],
    // },
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
