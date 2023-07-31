import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ContractsService, InfuraService } from ".";
import { ERC721Test } from "../typechain-types/contracts/ERC721Test.sol/ERC721Test";
import { GetBalanceArgs, MintArgs, Networks } from "../types";
import { TOKEN_NAME } from "../utils/constants";
import { getContractFromDetails } from "./contracts.service";

// >>>> Transactions <<<<
export const mint = async (args: MintArgs, hre: HardhatRuntimeEnvironment) => {
  const { to, token } = args;
  const Contract = await getContractFromDetails<ERC721Test>(TOKEN_NAME, hre);
  const admin = getAdmin(hre);

  return await Contract.connect(admin).mint(to, token);
};
// >>>> Transactions <<<<

// >>>> Calls <<<<
export const getBalance = async (
  args: GetBalanceArgs,
  hre: HardhatRuntimeEnvironment
) => {
  const { address } = args;

  const Contract = await getContractFromDetails<ERC721Test>(TOKEN_NAME, hre);

  const balance = await Contract.balanceOf(address);

  console.log(`Balance: ${balance.toNumber()}`);

  return balance;
};
// >>>> Calls <<<<

// >>>> Helpers <<<<
const getAdmin = (hre: HardhatRuntimeEnvironment) => {
  if (!process.env.OWNER_PRIVATE_KEY)
    throw new Error("Admin private key not defined");

  const provider = ContractsService.getProvider(hre);

  return new Wallet(
    process.env.OWNER_PRIVATE_KEY,
    provider
  ) as unknown as SignerWithAddress;
};
// >>>> Helpers <<<<
