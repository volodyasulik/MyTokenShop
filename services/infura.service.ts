import { providers } from "ethers";
import { Networks } from "../types";

export const getInfuraProvider = (network: Networks) => {
  const provider = new providers.InfuraProvider(network, process.env.INFURA_APP_ID);
  return new providers.InfuraProvider(network, process.env.INFURA_APP_ID);
};
