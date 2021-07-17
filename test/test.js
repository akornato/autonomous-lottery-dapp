import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lottery", function () {
  it("Should have correct round payout", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();

    await lottery.deployed();
    const currentRound = await lottery.getCurrentRound();
    expect(currentRound).to.equal(0);
    await expect(
      lottery.enterCurrentRound({
        value: ethers.utils.parseEther("0.001"),
      })
    ).to.be.revertedWith("Minimum bet value is 0.01 ether");
    await lottery.enterCurrentRound({ value: ethers.utils.parseEther("0.01") });
    expect(await lottery.payouts[currentRound]).to.equal(
      ethers.utils.parseEther("0.01").BigNumber
    );
  });
});
