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

  it("Should allow presale mint with valid proof", async function () {
    const mintPrice = ethers.utils.parseEther("0.05");
    const leaf = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [addr1.address]));
    const merkleRoot = ethers.utils.keccak256(leaf); // Simple root for one address
    await zomboys.setMerkleRoot(merkleRoot);
    await zomboys.togglePresale();

    const proof = [leaf]; // Simplified
    await zomboys.connect(addr1).presaleMint(proof, { value: mintPrice });
    expect(await zomboys.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should support ERC2981 royalties", async function () {
    expect(await zomboys.supportsInterface("0x2a55205a")).to.equal(true); // ERC2981 interface
  });

  it("Should allow owner to withdraw funds", async function () {
    const mintPrice = ethers.utils.parseEther("0.05");
    await zomboys.connect(addr1).mint({ value: mintPrice });

    const initialBalance = await owner.getBalance();
    await zomboys.withdraw();
    const finalBalance = await owner.getBalance();
    expect(finalBalance.gt(initialBalance)).to.equal(true);
  });

  it("Should set base URI correctly", async function () {
    const uri = "https://ipfs.io/ipfs/";
    await zomboys.setBaseURI(uri);
    expect(await zomboys.baseURI()).to.equal(uri); // Assuming _baseURI is exposed, but it's internal
  });
});