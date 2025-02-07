"use client"
import { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Link from 'next/link'
import { WalletOptions } from "./wallet";
import { useAccount } from 'wagmi'

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
    <div className="fixed w-full min-h-screen bg-black bg-hero flex justify-center items-center">
      <Header />
      <div >

        <div
          className="z-10 w-full m-auto flex justify-center text-center flex-col items-center z-1 text-white"
          style={{ maxWidth: "1200px" }}
        >
          {accountAddress == "" ?
            <>
              <button className="heartbutton">
                L O V E B Y T E
              </button>
              <div className="text-white mt-20 text-xs">
                <WalletOptions />
              </div>
            </>
            :
            <div className="flex flex-col justify-center items-center text-center">
              <Link href="/lovebyte">
                <button className="heartbutton">
                  L O V E B Y T E
                </button>
                <div className="text-white text-xs">
                  CLICK TO ENTER
                </div>
              </Link>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
