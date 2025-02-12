"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Contract, JsonRpcProvider } from "ethers";
import { CONTRACT_ABI } from "../../contract/contractDetails";
import CountdownTimer from "./countdown";
import { About } from "./about";
import Header from "@/app/components/header";

export default function Id() {
    const params = useParams();
    const [message, setUserMessage] = useState<string>("");

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
            <Header />
            {/* Top Section */}
            <Image
                className={message ? "pt-4 w-[250px]": "pt-4 w-[320px]"}
                src={message ? "/images/view/text.svg" : "/images/share/top.svg"}
                width={500}
                height={64}
                alt="Header Image"
            />

            {/* Message Display or Countdown */}
            {message ? (
                <div
                    className="w-[90%] max-w-lg h-[150px] sm:h-[180px] md:h-[200px] px-6 py-4 text-[#FF35D0] bg-slate-200
          flex items-center justify-center text-center"
                >
                    {message}
                </div>
            ) : (
                <CountdownTimer />
            )}

            {/* Instruction & About Section */}
            <Image className="cursor-pointer" src="/images/share/how.svg" width={200} height={64} alt="How-To Guide" />

            <div className="p-4 font-rethink text-white sm:text-base">
                <ul className="list-disc space-y-2 ml-6">
                    <li>Read the {' '}
                        <a
                            href="https://eprint.iacr.org/2023/189"
                            className="text-[#FF35D0] underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Practical Timelock Encryption from Threshold BLS paper</a></li>
                    <li>Try out {' '}<a
                        href="https://github.com/randa-mu/blocklock-js"
                        className="text-[#FF35D0] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >blocklock-js</a>!</li>
                    <li>Meet the <a
                        href="https://randa.mu/"
                        className="text-[#FF35D0] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Randamu</a> team that built blocklock-js</li>
                    <li>Join the <a
                        href="https://t.me/+iZ27z-ROkfUyOTA1"
                        className="text-[#FF35D0] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >FIL Builder telegram</a>.</li>
                </ul>
            </div>

            {/* About Section */}
            <Image className="cursor-pointer" src="/images/share/about.svg" width={200} height={64} alt="About" />
            <About />
            <Image src="/images/footer.png" alt="" width={150} height={20} className="mt-10 w-[150px] mb-10" />

        </div>
    );
}
