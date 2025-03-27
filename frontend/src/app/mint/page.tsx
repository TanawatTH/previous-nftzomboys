"use client";

import { useState } from "react";
import { useWeb3 } from "@/components/Web3Provider";
import { ethers } from "ethers";
import ConnectWallet from "@/components/ConnectWallet";

const contractAddress = "0xYourContractAddress"; // Placeholder
const abi = [
  "function mint() payable",
  "function presaleMint(bytes32[] calldata _merkleProof) payable",
];

export default function MintPage() {
  const { signer, connectWallet, account } = useWeb3();
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    if (!signer) {
      alert("Please connect your wallet first");
      return;
    }
    setMinting(true);
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.mint({ value: ethers.utils.parseEther("0.05") });
      await tx.wait();
      alert("Minted successfully!");
    } catch (error: any) {
      console.error(error);
      if (error.code === 4001) {
        alert("Transaction rejected by user");
      } else if (error.message.includes("Insufficient payment")) {
        alert("Insufficient funds for minting");
      } else {
        alert("Minting failed: " + error.message);
      }
    }
    setMinting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Mint Your Zomboys NFT</h1>
        <ConnectWallet />
        {account && (
          <button
            onClick={handleMint}
            disabled={minting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            {minting ? "Minting..." : "Mint (0.05 ETH)"}
          </button>
        )}
      </div>
    </div>
  );
}