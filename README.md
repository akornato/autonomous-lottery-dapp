# Autonomous Lottery Dapp

Managerless lottery whose rounds are determined by Ethereum block numbers modulo 10.

## Motivation

Lottery dapps usually require a manager to trigger a transaction that selects a winner randomly, to be stored in contract state. This lottery winners are instead determined by the hash of the first block after the last block of a given round, and need not be stored. The limitation of the approach is [blockhash (uint blockNumber)](https://docs.soliditylang.org/en/v0.8.6/units-and-global-variables.html#block-and-transaction-properties) which works only for the 256 most recent blocks.

## Hardhat

[Hardhat](https://hardhat.org/) Network is used to run and debug Solidity locally, along with [Typechain](https://github.com/ethereum-ts/TypeChain) to provide TypeScript bindings for Ethereum smart contracts.

## Ethers.js

Both Hardhat scripts and frontend code use [Ethers](https://docs.ethers.io/) to interact with the blockchain.

## Solidity

Patterns applied:

- [Checks Effects Interactions](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html) - `withdrawPayout`
- [Pull over Push](https://github.com/fravoll/solidity-patterns/blob/master/docs/pull_over_push.md) - `withdrawPayout`

External/public contract functions are covered by [Mocha](https://mochajs.org/) tests.

## Next.js

[Next.js](https://nextjs.org/) hits [Infura](https://infura.io/) on SSR to render the latest lottery info (rounds, players, payouts, winners) for browsers with no Ethereum provider like [Metamask](https://metamask.io/) installed. Metamask is only required to interact with the lottery.

## React

The client uses context provider with React Hooks pattern for global state management, initialized (hydrated) from SSR.

## Styling

[Tailwind](https://tailwindcss.com/) is used for layout, and [Ant Design](https://ant.design/) for UI components.

## TypeScript

All code across Next.js, React, Hardhat scripts and tests is statically typed with TypeScript.
