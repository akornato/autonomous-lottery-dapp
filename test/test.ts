import { expect } from "chai";
import { ethers } from "hardhat";
import type { Lottery } from "../typechain";

describe("Lottery", function () {
  let lottery: Lottery;

  before(async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy();
    await lottery.deployed();
  });

  it("Should have correct round starting block", async function () {
    const roundStartingBlock = await lottery
      .getCurrentRound()
      .then((bigNumber) => bigNumber.toNumber());
    expect(roundStartingBlock).to.equal(0);
  });

  it("Should have correct round payout", async function () {
    const signers = await ethers.getSigners();
    await expect(
      lottery.connect(signers[0]).enterCurrentRound({
        value: ethers.utils.parseEther("0.001"),
      })
    ).to.be.revertedWith("Minimum bet value is 0.01 ether");
    await lottery
      .connect(signers[0])
      .enterCurrentRound({ value: ethers.utils.parseEther("0.01") });
    const payouts = await lottery.getPayouts();
    expect(payouts[0]).to.equal(ethers.utils.parseEther("0.01"));
  });
});
