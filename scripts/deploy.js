// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

const { METAMASK_ADDRESS } = process.env;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  let lottery = await Lottery.deploy();

  await lottery.deployed();
  console.log("Lottery deployed to:", lottery.address);

  const signers = await ethers.getSigners();

  console.log("Send 100 ethers to Metamask address");
  const tx = await signers[0].sendTransaction({
    to: METAMASK_ADDRESS,
    value: ethers.utils.parseEther("100"),
  });
  await tx.wait();

  for (const signer of signers) {
    console.log(`Make ${signer.address} enter current round`);
    lottery = lottery.connect(signer);
    const tx = await lottery.enterCurrentRound({
      value: ethers.utils.parseEther("1.0"),
    });
    await tx.wait();
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
