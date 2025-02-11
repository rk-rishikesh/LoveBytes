"use client"
import Image from "next/image";
import { Wallet } from "./custom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center flex-col gap-12 px-4 sm:px-8 lg:px-16">
      <Image src="/images/hero.svg" alt="" width={600} height={20} className="w-full max-w-[600px]" />
      {/* <Image src="/images/text.svg" alt="" width={500} height={20} className="w-full max-w-[500px]" /> */}
      <div className="p-6 max-w-[600px]">

        <div className="space-y-2 text-white">
          <div className="flex gap-2">
            <Image src="/images/instruction.svg" alt="" width={200} height={20} className="w-[400px] mb-4" />
          </div>
          <div className="flex gap-2">
            <span className="font-rethink">1.</span>
            <span className="font-rethink">Connect wallet to Filecoin’s calibration testnet (get some tFIL, faucet{' '}
              <a
                href="https://faucet.calibnet.chainsafe-fil.io/funds.html"
                className="text-[#FF35D0] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>)
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-rethink">2.</span>
            <span className="font-rethink">Write a love byte message!</span>
          </div>
          <div className="flex gap-2">
            <span className="font-rethink">3.</span>
            <span className="font-rethink">Timelock encrypt it so that it can’t be decrypted until Valentines Day</span>
          </div>
          <div className="flex gap-2">
            <span className="font-rethink">4.</span>
            <span className="font-rethink">Share the page URL with a special someone</span>
          </div>
          <div className="flex gap-2">
            <span className="font-rethink">5.</span>
            <span className="font-rethink">Your love byte message will be decrypted and revealed automatically on Valentine’s Day (UTC 00:00, Feb 14 2025)</span>
          </div>
        </div>
      </div>
      <Wallet />
      <Image src="/images/footer.png" alt="" width={150} height={20} className="mt-10 w-[150px] mb-10" />
    </div>
  );
}
