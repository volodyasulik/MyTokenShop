import { ContractTransaction } from "ethers";
import { types } from "hardhat/config";
import { ArgumentType } from "hardhat/types";
import * as Validation from "./index";

const tx: ArgumentType<ContractTransaction> = {
  name: "tx",
  validate: (argName: string, value: any) => {
    let isTx = true;
    try {
      Validation.TxSchema.parse(value);
    } catch {
      isTx = false;
    }

    if (!isTx) {
      throw new Error(`Invalid ${tx.name}`);
    }
  },
};

export default {
  ...types,
  tx,
};
