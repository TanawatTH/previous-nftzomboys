const { ethers } = require("hardhat");

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log("Deploying to network:", network.name);

  if (network.name !== "arbitrumTestnet" && network.name !== "arbitrumMainnet") {
    throw new Error("Please deploy to Arbitrum network");
  }

  const Zomboys = await ethers.getContractFactory("Zomboys");
  const zomboys = await Zomboys.deploy();

  await zomboys.deployed();

  console.log("Zomboys deployed to:", zomboys.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });