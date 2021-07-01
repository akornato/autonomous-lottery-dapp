import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lottery", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy("Hello, world!");

    await lottery.deployed();
    expect(await lottery.greet()).to.equal("Hello, world!");

    await lottery.setGreeting("Hola, mundo!");
    expect(await lottery.greet()).to.equal("Hola, mundo!");
  });
});
