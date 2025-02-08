"use client"

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

    console.log(contract)

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

    console.log(receipt);

    if (!receipt) {
      throw new Error("Transaction has not been mined");
    }

    console.log("Timelock request created!");
    console.log(receipt);
    console.log("Encrypted at : ", await provider.getBlockNumber());
    console.log("Will decrypt at : ", blockHeight);
    setLoading(false);
    console.log(loading)
    const requestId = await contract.userRequestId(address);
    router.push(`/share/${requestId}`);
  }

  if (loading) {
    return (<>
      <div className="w-full min-h-screen bg-black bg-hero gap-8 flex justify-center p-2 flex-col items-center">
        <Image
          className="cursor-pointer animate-pulse"
          src="/assets/loader.svg"
          width={600}
          height={615}
          alt="FIL-B Logo"
        />
        <Image
          className="cursor-pointer mt-8"
          src="/assets/encrypt.svg"
          width={300}
          height={615}
          alt="FIL-B Logo"
        />
      </div>
    </>)
  } else {
    return (
      <>
        <div className="w-full min-h-screen bg-black bg-hero flex justify-center p-2 flex-col items-center">
          <div className="flex flex-row gap-0">
            <Image
              className="cursor-pointer "
              src="/assets/hero/lovebyte.svg"
              width={600}
              height={615}
              alt="FIL-B Logo"
            />
          </div>
          <div className="mt-16 mb-10 px-8 flex justify-center flex-col items-center">
            <Image alt="" src="assets/hero/text.svg" width={280} height={64} className="mb-10" />

            <textarea
              id="paperTextarea"
              className="w-[600px] h-[200px] px-12 py-10
                       text-gray-800 placeholder-gray-500
                       bg-transparent outline-none "
              placeholder="Write your love byte..."
              style={{
                backgroundImage: `url("/assets/hero/paper.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onChange={handleChange}
            />
          </div>


          <div className="flex flex-row gap-0">
            <Image
              className="cursor-pointer "
              src="/assets/hero/cta.svg"
              width={220}
              height={40}
              alt="FIL-B Logo"
              onClick={engraveMessage}
            />
          </div>
        </div>
      </>
    )
  }


}