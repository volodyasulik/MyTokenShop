import { hardhatArguments } from "hardhat";
import { deploy, add2Details } from "../utils/deploy-heper";

async function main() {
  if (!hardhatArguments.network) throw new Error("Network not provided");
  const address = await deploy("MyShop", []);
  add2Details("MShop", address, "localhost");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
