"use client";

import Image from "next/image";
import { ethers, BrowserProvider, Contract } from "ethers";
import { Blocklock, encodeCiphertextToSolidity } from "blocklock-js";
import { AbiCoder } from "ethers";
import { CONTRACT_ABI } from "../contract/contractDetails";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from 'wagmi'

export default function LoveByte() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>("");

  const { address } = useAccount()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const engraveMessage = async () => {
    setLoading(true);
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    // Create BrowserProvider and Signer (updated for ethers v6)
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Create Contract Instance
    const contract = new Contract(
      "0xdAE55018E30929e2992d27e7c4038CBF4FDB9aaf",
      CONTRACT_ABI,
      signer
    );

    const blockHeight = BigInt((await provider.getBlockNumber()) + 5);

    const msgBytes = AbiCoder.defaultAbiCoder().encode(["string"], [value]);
    const encodedMessage = ethers.getBytes(msgBytes);

    // Encrypt the encoded message
    const blocklockjs = new Blocklock(
      accounts,
      "0xfF66908E1d7d23ff62791505b2eC120128918F44"
    );

    const ciphertext = blocklockjs.encrypt(encodedMessage, blockHeight);

    // Call `createTimelockRequest` on the user's contract
    const tx = await contract
      .createTimelockRequest(blockHeight, encodeCiphertextToSolidity(ciphertext));

    const receipt = await tx.wait(1);

    if (!receipt) {
      throw new Error("Transaction has not been mined");
    }

    console.log("Timelock request created!");
    const requestId = await contract.userRequestId(address);
    router.push(`/share/${requestId}`);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black bg-hero gap-8 flex justify-center p-2 flex-col items-center">
        <Image
          className="cursor-pointer animate-pulse"
          src="/assets/loader.svg"
          width={600}
          height={615}
          alt=""
        />
        <Image
          className="cursor-pointer mt-8"
          src="/assets/encrypt.svg"
          width={300}
          height={615}
          alt=""
        />
      </div>
    );
  } else {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center p-2 flex-col items-center">

        <div className="mt-16 mb-10 px-4 sm:px-8 lg:px-16 flex justify-center flex-col items-center">
          <Image alt="" src="assets/hero/text.svg" width={280} height={64} className="mb-10" />
          <textarea
            id="paperTextarea"
            className="lg:w-[600px] w-[300px] lg:h-[200px] h-[150px] px-4 sm:px-6 md:px-12 lg:py-10 py-4 text-[#FF35D0] placeholder-[#FF35D0] bg-transparent outline-none"
            placeholder="Write your love byte..."
            style={{
              backgroundColor:"#696969",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Image
            className="cursor-pointer"
            src="/assets/hero/cta.svg"
            width={220}
            height={40}
            alt=""
            onClick={engraveMessage}
          />
        </div>
      </div>
    );
  }
}
