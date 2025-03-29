"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/components/Web3Provider";
import { ethers } from "ethers";

const contractAddress = "0xYourContractAddress"; // Placeholder
const abi = [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

export default function NFTDetailPage() {
  const { id } = useParams();
  const { provider } = useWeb3();
  const [nft, setNft] = useState<{ uri: string; owner: string } | null>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      if (!provider || !id) return;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const owner = await contract.ownerOf(id);
      const uri = await contract.tokenURI(id);
      setNft({ uri, owner });
    };
    fetchNFT();
  }, [provider, id]);

  if (!nft) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-4">Zomboys #{id}</h1>
      <img src={nft.uri} alt={`Zomboys #${id}`} className="w-64 h-64 object-cover mb-4" />
      <p>Owner: {nft.owner}</p>
    </div>
  );
}