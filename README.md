_Last update: 19.10.2022_

# Structure overview

## /contracts

Your solidity smart contracts

## /deployment_details

Folder where contract addresses will be stored for each SC, for each network
It will be auto-updated after each deploy

## /scripts

Any additional hardhat scripts you need
e.g. Deploy, upgrade scripts

## /services

All services you use for hardhat tasks, scripts

## /test

is where your tests should go

## /types

## /utils

Utils used in services, tests, ...

## /validation

Validation schemas used in hardhat tasks, scripts

## hardhat.config

Here you describe all tasks (helpers) you need
e.g. mint, transferOwnership, setBaseURI, ...

# Running tasks
Example:

```code
task("mint", "Mint token to account")
  .addParam("to", "Address of the account")
  .addParam("token", "Token id to mint")
  .setAction(async (args: MintArgs, hre) => {
    const parsedArgs = Validation.MintSchema.parse(args);
    const tx = await ERC721Service.mint(parsedArgs, hre);
    await hre.run("wait", { tx });
  });
```

To run this task we call `npx hardhat mint --to <address> --token <token id> --network <localhost | goerli | mainnet>`

What happens here:
1. `Validation.MintSchema.parse(args);`
   validate input params
2. `ERC721Service.mint(parsedArgs, hre)`
   Send mint transaction
3. `hre.run("wait", { tx })`
   Run subtask `wait`, which logs `tx.hash` and waits until transaction is executed


More about tasks & scripts:
> [Hardhat Doc](https://hardhat.org/hardhat-runner/docs/guides/tasks-and-scripts)