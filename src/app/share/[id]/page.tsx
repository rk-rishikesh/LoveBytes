"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Contract, JsonRpcProvider } from "ethers";
import { CONTRACT_ABI } from "../../contract/contractDetails";
import CountdownTimer from "./countdown";
import { About } from "./about";

export default function Id() {
  const params = useParams();
  const [message, setUserMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Function to copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
        const contract = new Contract("0xcF04a63AedF2B4d83f3fFA40b523694df0e8F6C9", CONTRACT_ABI, provider);
        const lovebyte = await contract.userMessage(params.id);
        setUserMessage(lovebyte);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center p-4 pt-24 gap-12">
      {/* Top Section */}
      <Image
        className="cursor-pointer"
        src={message ? "/images/view/text.svg" : "/images/share/top.svg"}
        width={500}
        height={64}
        alt="Header Image"
      />

      {/* Message Display or Countdown */}
      {message ? (
        <div
          className="w-[90%] max-w-lg h-[150px] sm:h-[180px] md:h-[200px] px-6 py-4 text-[#FF35D0] bg-gray-600 
          flex items-center justify-center text-center rounded-lg"
        >
          {message}
        </div>
      ) : (
        <CountdownTimer />
      )}

      {/* Copy Button */}
      {!message && (
        <button onClick={copyToClipboard} className="focus:outline-none">
          <Image
            alt="Copy Button"
            src={copied ? "/images/share/copied.svg" : "/images/share/copy.svg"}
            width={500}
            height={64}
          />
        </button>
      )}

      {/* Instruction & About Section */}
      <Image className="cursor-pointer" src="/images/share/how.svg" width={200} height={64} alt="How-To Guide" />

      <div className="p-4 font-rethink text-white text-sm sm:text-base">
        <ul className="list-disc space-y-2 ml-6">
          <li>Read the Practical Timelock Encryption from Threshold BLS paper</li>
          <li>Try out blocklock-js!</li>
          <li>Meet the Randamu team that built blocklock-js</li>
          <li>Join the FIL Builder telegram</li>
        </ul>
      </div>

      {/* About Section */}
      <Image className="cursor-pointer" src="/images/share/about.svg" width={200} height={64} alt="About" />
      <About />
    </div>
  );
}
