"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
// import { WalletOptions } from "./wallet";
import Header from "./components/header";
import Footer from "./components/footer";
import Link from 'next/link'
import { WalletOptions } from "./wallet";
import { useAccount, useDisconnect, useEnsName } from 'wagmi'

export default function Home() {

  const { address } = useAccount();
  const [accountAddress, setAccountAddress] = useState<string>("");

  useEffect(() => {
    if (address) {
      setAccountAddress(truncateAddress(address));
    }
  }, [address]);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 16)}...${addr.slice(-4)}`;
  };


  return (
    <div className="fixed w-full min-h-screen bg-[#C2B7FF] bg-hero">
      <Header />
      <div >

        <div
          className="z-10 relative w-full pt-48 pb-40 m-auto flex justify-center text-center flex-col items-center z-1 text-white mt-36"
          style={{ maxWidth: "1200px" }}
        >
          <Image alt="heart" src="/assets/heart.png" width={400} height={400} className="absolute " />

          {accountAddress == "" ?
            <>
              <button className="heartbutton">
                L O V E B Y T E
              </button>
              <div className="text-white absolute mt-20 text-xs">
                <WalletOptions />
              </div>
            </>
            :
            <>
              <Link href="/lovebyte">
                <button className="heartbutton">
                  L O V E B Y T E
                </button>
              </Link>
              <div className="text-white absolute mt-20 text-xs">
                CLICK TO ENTER
              </div>
            </>

          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
