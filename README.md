# Autonomous Lottery Dapp

Autonomous lottery whose rounds are determined by Ethereum block numbers modulo 10. Winners are determined by hashing player addresses and need not be stored in contract state. **This can be manipulated by miners so the project is not ready for mainnet yet.** Rinkeby testnet deploy: https://autonomous-lottery-dapp.vercel.app

## Hardhat

[Hardhat](https://hardhat.org/) Network is used to run and debug Solidity locally, along with [Typechain](https://github.com/ethereum-ts/TypeChain) to provide TypeScript bindings for Ethereum smart contracts.

## Solidity

Patterns applied:

- [Checks Effects Interactions](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)
- [Pull over Push](https://github.com/fravoll/solidity-patterns/blob/master/docs/pull_over_push.md)
- [Guard Check](https://github.com/fravoll/solidity-patterns/blob/master/docs/guard_check.md)

## Ethers.js

[Ethers](https://docs.ethers.io/) library is used to interact with the blockchain.

## Waffle

External & public contract functions are covered by [Waffle](https://ethereum-waffle.readthedocs.io) tests.

## Next.js

[Next.js](https://nextjs.org/) hits [Infura](https://infura.io/) on SSR to render the latest lottery info (rounds, players, payouts, winners) for browsers with no Ethereum provider like [Metamask](https://metamask.io/) installed. Metamask is only required to interact with the lottery.

## React

Frontend uses context provider with React Hooks pattern for global state management, initialized (hydrated) from SSR.

## Styling

[Tailwind](https://tailwindcss.com/) is used for layout, and [Ant Design](https://ant.design/) for UI components.

## TypeScript

All code across Next.js, React, Hardhat scripts and tests is statically typed with TypeScript.
