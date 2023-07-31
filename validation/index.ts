import { z } from "zod";

const isAddress = /^0x.{40}$/;
const address = z.string().regex(isAddress, "Invalid address");
const bool = z
  .string()
  .refine((variable: string) => variable === "true" || variable == "false")
  .transform((arg) => arg === "true");
const number = z
  .string()
  .refine(
    (variable: string | number) =>
      Number.isInteger(variable) || Number.isInteger(+variable)
  )
  .transform((arg) => parseInt(arg));

export const MintSchema = z.object({
  to: address,
  token: number,
});
export const GetBalanceSchema = z.object({
  address,
});

export const TxSchema = z.object({
  hash: z.string(),
  wait: z.function().args(z.number().optional()),
});
