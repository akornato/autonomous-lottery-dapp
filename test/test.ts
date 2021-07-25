import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import type { Signer } from "ethers";
import type { Lottery } from "../typechain";

const provider = waffle.provider;

describe("Lottery", function () {
  let lottery: Lottery;
  let signers: Signer[];

  before(async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy();
    await lottery.deployed();
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

  it("Should have winners", async function () {
    const winners = [await lottery.getWinner(0), await lottery.getWinner(1)];
    let firstWinnerFound = false;
    let secondWinnerFound = false;
    for (const signer of signers) {
      if (winners[0] == (await signer.getAddress())) {
        firstWinnerFound = true;
      }
      if (winners[1] == (await signer.getAddress())) {
        secondWinnerFound = true;
      }
    }
    expect(firstWinnerFound).to.be.true;
    expect(secondWinnerFound).to.be.true;
  });

  it("Should have withdrawable payouts", async function () {
    const winner = await lottery.getWinner(0);
    const winnerBalanceBeforePayoutWithdrawal = await provider.getBalance(
      winner
    );
    const tx = await lottery.connect(signers[0]).withdrawPayout(0);
    await tx.wait();
    const payouts = await lottery.getPayouts();
    expect(payouts[0]).to.equal(ethers.utils.parseEther("0"));
    const winnerBalanceAfterPayoutWithdrawal = await provider.getBalance(
      winner
    );
    expect(winnerBalanceAfterPayoutWithdrawal).to.be.equal(
      winnerBalanceBeforePayoutWithdrawal.add(ethers.utils.parseEther("7.0"))
    );
  });
});
