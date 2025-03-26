"use client";

import { useWeb3 } from "@/components/Web3Provider";

export default function ConnectWallet() {
  const { connectWallet, account } = useWeb3();

  if (account) {
    return <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>;
  }

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Connect Wallet
    </button>
  );
}