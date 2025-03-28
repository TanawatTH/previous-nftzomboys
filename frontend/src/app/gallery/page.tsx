"use client";

import { useEffect, useState } from "react";
import { useWeb3 } from "@/components/Web3Provider";
import { ethers } from "ethers";

const contractAddress = "0xYourContractAddress"; // Placeholder
const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

interface NFT {
  id: number;
  uri: string;
}

export default function GalleryPage() {
  const { provider, account } = useWeb3();
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!provider || !account) return;
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const balance = await contract.balanceOf(account);
      const nftList: NFT[] = [];
      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const uri = await contract.tokenURI(tokenId);
        nftList.push({ id: tokenId.toNumber(), uri });
      }
      setNfts(nftList);
    };
    fetchNFTs();
  }, [provider, account]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8 text-center">Your Zomboys Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-gray-800 p-4 rounded">
            <img src={nft.uri} alt={`Zomboys #${nft.id}`} className="w-full h-48 object-cover" />
            <p className="mt-2">Zomboys #{nft.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}