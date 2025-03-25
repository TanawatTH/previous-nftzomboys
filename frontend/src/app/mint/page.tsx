"use client";

import { useState } from "react";
import { useWeb3 } from "@/components/Web3Provider";
import { ethers } from "ethers";

const contractAddress = "0xYourContractAddress"; // Placeholder
const abi = [
  "function mint() payable",
  "function presaleMint(bytes32[] calldata _merkleProof) payable",
];

export default function MintPage() {
  const { signer, connectWallet, account } = useWeb3();
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    if (!signer) return;
    setMinting(true);
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.mint({ value: ethers.utils.parseEther("0.05") });
      await tx.wait();
      alert("Minted successfully!");
    } catch (error) {
      console.error(error);
      alert("Minting failed");
    }
    setMinting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Mint Your Zomboys NFT</h1>
        {!account ? (
          <button onClick={connectWallet} className="bg-blue-500 px-4 py-2 rounded">
            Connect Wallet
          </button>
        ) : (
          <div>
            <p>Connected: {account}</p>
            <button
              onClick={handleMint}
              disabled={minting}
              className="bg-green-500 px-4 py-2 rounded mt-4"
            >
              {minting ? "Minting..." : "Mint (0.05 ETH)"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}