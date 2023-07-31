import { z } from "zod";
import * as Validation from "../validation";

export type MintArgs = z.infer<typeof Validation.MintSchema>;
export type GetBalanceArgs = z.infer<typeof Validation.GetBalanceSchema>;

export type Networks = "goerli" | "mainnet" | "localhost";
