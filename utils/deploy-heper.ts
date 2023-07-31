import { ethers, hardhatArguments, run, upgrades } from "hardhat";
import fs from "fs";
import { DEPLOYMENT_DETAILS_FOLDER } from "./constants";

export async function deploy(
  contractName: string,
  constructorArguments: unknown[]
) {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying Contract with the account:", deployer.address);
  console.log("Account Balance:", (await deployer.getBalance()).toString());

  if (!hardhatArguments.network) {
    throw new Error("please pass --network");
  }

  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy(constructorArguments);
  await contract.deployed();

  return contract.address;
}

export const add2Details = (
  fileName: string,
  address: string,
  networkName: string
) => {
  const dirName = DEPLOYMENT_DETAILS_FOLDER;
  const dirPath = `${process.cwd()}/${dirName}`;
  const filePath = `${dirPath}/${fileName}.json`;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ [networkName]: address }));
  } else {
    const details = JSON.parse(
      fs.readFileSync(filePath, { encoding: "utf-8" })
    );

    details[networkName] = address;

    fs.writeFileSync(filePath, JSON.stringify(details));
  }
};
