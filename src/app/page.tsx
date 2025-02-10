"use client"
import Image from "next/image";
import { Wallet } from "./custom";

export default function Home() {

  return (
    <div className="fixed w-full min-h-screen bg-black flex justify-center items-center flex-col gap-12 px-4 sm:px-8 lg:px-16">
      <Image src="/images/hero.svg" alt="" width={600} height={20} className="w-full max-w-[600px]" />
      <Image src="/images/text.svg" alt="" width={500} height={20} className="w-full max-w-[500px]" />
      <Wallet />
      <Image src="/images/footer.png" alt="" width={150} height={20} className="mt-10 w-[150px]" />
    </div>
  );
}
