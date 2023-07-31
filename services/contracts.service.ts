import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Networks } from "../types";
import fs from "fs";
import { InfuraService } from ".";
import { providers } from "ethers";

export const getProvider = (hre: HardhatRuntimeEnvironment) => {
  return hre.network.name === "localhost"
    ? new providers.JsonRpcProvider()
    : InfuraService.getInfuraProvider(hre.network.name as Networks);
};

export const getContractFromDetails = async <C>(
  contractName: string,
  hre: HardhatRuntimeEnvironment
) => {
  const contractDetails = getDeployedContractDetails(contractName);
  const networkName = hre.network.name as Networks;
  const abi = await getAbi(contractName, hre);

  const provider = getProvider(hre);
  try {
    const contract = new hre.ethers.Contract(
      contractDetails[networkName],
      abi,
      provider
    );
    return contract as C;
  } catch (e) {
    throw new Error("Error loading contract");
  }
};

export const getAbi = async (
  contractName: string,
  hre: HardhatRuntimeEnvironment
) => {
  try {
    const { abi } = await hre.artifacts.readArtifact(contractName);
    return abi;
  } catch (e) {
    throw Error("Error loading ABI");
  }
};

export const getDeployedContractDetails = (
  contractName: string
): Record<Networks, string> => {
  const location = `deployment_details/${contractName}.json`;
  try {
    const deploymentDetails = JSON.parse(
      fs.readFileSync(location, {
        encoding: "utf-8",
      })
    );
    return deploymentDetails;
  } catch (e) {
    throw Error("Contract isn't deployed");
  }
};
