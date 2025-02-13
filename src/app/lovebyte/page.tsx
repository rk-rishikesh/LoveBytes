"use client";

import Image from "next/image";
import { ethers, BrowserProvider, Contract } from "ethers";
import { Blocklock, encodeCiphertextToSolidity } from "blocklock-js";
import { AbiCoder } from "ethers";
import { CONTRACT_ABI } from "../contract/contractDetails";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from 'wagmi'
import Header from "../components/header";

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
      "0xcF04a63AedF2B4d83f3fFA40b523694df0e8F6C9",
      CONTRACT_ABI,
      signer
    );

    const blockHeight = BigInt(2405506);

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
    console.log("Request ID ", requestId, " will decrypt at : ", blockHeight)
    router.push(`/share/${requestId}`);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black gap-8 flex justify-center p-2 flex-col items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-[#FF35D0] animate-bounce"></div>
          <div
            className="w-4 h-4 rounded-full bg-[#FF35D0] animate-bounce [animation-delay:-.3s]"
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-[#FF35D0] animate-bounce [animation-delay:-.5s]"
          ></div>
        </div>

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
        <Header />
        <div className="mt-16 mb-10 px-4 sm:px-8 lg:px-16 flex justify-center flex-col items-center">
          <Image alt="" src="assets/hero/text.svg" width={280} height={64} className="mb-10 w-[200px]" />
          <textarea
            id="paperTextarea"
            className="lg:w-[600px] w-[300px] leading-[59.27px] lg:h-[200px] h-[150px] px-4 sm:px-6 md:px-12 lg:py-10 py-4 text-[#FF35D0] placeholder-[#FF35D0] bg-transparent outline-none"
            placeholder=""
            style={{
              backgroundColor: "#E2E8F0",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Image
            className="cursor-pointer w-[150px]"
            src="/assets/hero/cta.svg"
            width={220}
            height={40}
            alt=""
            onClick={engraveMessage}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="text-[19px] text-[#FF35D0] text-center">
          NOTE: ONCE DECRYPTED, MESSAGES ARE NOT PRIVATE 👀
          </div>
          </div>
      </div>

    );
  }
}
