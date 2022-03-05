import { ethers } from "hardhat";
import { VideoManager__factory } from "../typechain";

const main = async () => {
  const [deployer] = await ethers.getSigners();

  const vmFactory = new VideoManager__factory(deployer);
  const vmContract = await vmFactory.deploy();
  await vmContract.deployed();

  console.log("Deployed to:", vmContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
