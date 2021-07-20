import { expect } from "chai";
import { ethers } from "hardhat";
import type { Signer } from "ethers";
import type { Lottery } from "../typechain";

describe("Lottery", function () {
  let lottery: Lottery;
  let signers: Signer[];

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

  it("Should revert enterCurrentRound if value less than 0.01 ether", async function () {
    signers = await ethers.getSigners();
    await expect(
      lottery.connect(signers[0]).enterCurrentRound({
        value: ethers.utils.parseEther("0.001"),
      })
    ).to.be.revertedWith("Minimum bet value is 0.01 ether");
  });

  it("Should have correct payouts", async function () {
    for (const signer of signers) {
      const tx = await lottery.connect(signer).enterCurrentRound({
        value: ethers.utils.parseEther("1.0"),
      });
      await tx.wait();
    }
    const payouts = await lottery.getPayouts();
    expect(payouts[0]).to.equal(ethers.utils.parseEther("7.0"));
    expect(payouts[1]).to.equal(ethers.utils.parseEther("10.0"));
    expect(payouts[2]).to.equal(ethers.utils.parseEther("3.0"));
  });
});
