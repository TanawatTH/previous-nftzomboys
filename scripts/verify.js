const { ethers } = require("hardhat");

async function main() {
  const network = await ethers.provider.getNetwork();
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (!contractAddress) {
    throw new Error("Set CONTRACT_ADDRESS environment variable");
  }

  console.log("Verifying contract at:", contractAddress, "on network:", network.name);

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });

  console.log("Contract verified successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });