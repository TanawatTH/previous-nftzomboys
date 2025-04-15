const { ethers } = require("hardhat");

async function setBaseURI() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const baseURI = process.env.BASE_URI; // e.g., ipfs://Qm...

  const Zomboys = await ethers.getContractFactory("Zomboys");
  const zomboys = Zomboys.attach(contractAddress);

  const tx = await zomboys.setBaseURI(baseURI);
  await tx.wait();

  console.log("Base URI set to:", baseURI);
}

setBaseURI().catch(console.error);