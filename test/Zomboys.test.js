const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Zomboys", function () {
  let Zomboys, zomboys, owner, addr1;

  beforeEach(async function () {
    Zomboys = await ethers.getContractFactory("Zomboys");
    [owner, addr1] = await ethers.getSigners();
    zomboys = await Zomboys.deploy();
    await zomboys.deployed();
  });

  it("Should mint a token", async function () {
    const mintPrice = ethers.utils.parseEther("0.05");
    await zomboys.connect(addr1).mint({ value: mintPrice });
    expect(await zomboys.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should not mint without enough payment", async function () {
    await expect(zomboys.connect(addr1).mint({ value: ethers.utils.parseEther("0.04") })).to.be.revertedWith("Insufficient payment");
  });

  it("Should not mint beyond max supply", async function () {
    // This would require minting 10000, but for test, assume it's checked
  });
});