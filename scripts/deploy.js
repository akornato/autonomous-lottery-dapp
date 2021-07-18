// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

const { PLAYER_ADDRESS } = process.env;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();

  await lottery.deployed();
  console.log("Lottery deployed to:", lottery.address);

  // Send 100 ethers to player address
  const [sender] = await ethers.getSigners();
  const tx = await sender.sendTransaction({
    to: PLAYER_ADDRESS,
    value: ethers.utils.parseEther("100"),
  });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
