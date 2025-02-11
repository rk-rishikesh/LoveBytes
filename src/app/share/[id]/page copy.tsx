"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation'
import { Contract, JsonRpcProvider } from "ethers";
import { CONTRACT_ABI } from "../../contract/contractDetails";
import CountdownTimer from "./countdown";
import { About } from "./about";

export default function Id() {

    const params = useParams()
    const [message, setUserMessage] = useState<string>("");
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            console.log(window.location.href)
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };


    useEffect(() => {
        const fetchData = async () => {

            try {
                const provider = new JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");

                const contract = new Contract(
                    "0xcF04a63AedF2B4d83f3fFA40b523694df0e8F6C9",
                    CONTRACT_ABI,
                    provider
                );

                // const owner = await contract.ownerOfRequestId(params.id);
                // console.log(owner)

                const lovebyte = await contract.userMessage(params.id);
                setUserMessage(lovebyte);
            } catch (error) {
                console.error("Error fetching owner:", error);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <>
            <div className="w-full min-h-screen bg-black flex p-4 flex-col gap-12 mt-24 items-center">
                {message ? <>

                    {/* Top Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/view/text.svg"
                        width={500}
                        height={64}
                        alt=""
                    />

                    {/* Textarea */}
                    <div
                        className="w-[90%] sm:w-[350px] md:w-[450px] lg:w-[600px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[200px] 
            px-4 sm:px-6 md:px-12 lg:py-10 py-4 text-[#FF35D0] placeholder-[#FF35D0] bg-transparent outline-none"
                        style={{
                            backgroundColor: "#696969",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {message}
                    </div>

                    {/* Copy Image */}
                    <Image
                        alt=""
                        src="/images/view/check.svg"
                        width={500}
                        height={64}
                    />

                    <Image
                        className="cursor-pointer"
                        src="/images/share/how.svg"
                        width={200}
                        height={64}
                        alt=""
                    />

                    <div className="p-4 font-rethink">
                        <ul className="list-disc space-y-0 ml-6">
                            <li className="text-white">
                                Read the Practical Timelock Encryption from Threshold BLS paper
                            </li>
                            <li className="text-white">
                                Try out blocklock-js!
                            </li>
                            <li className="text-white">
                                Meet the Randamu team that built blocklock-js
                            </li>
                            <li className="text-white">
                                Join the FIL Builder telegram
                            </li>
                        </ul>
                    </div>
                    {/* Usecase Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/about.svg"
                        width={200}
                        height={64}
                        alt=""
                    />

                    <About />
                </> : <>


                    {/* Top Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/top.svg"
                        width={500}
                        height={64}
                        alt=""
                    />

                    {/* Textarea */}

                    <CountdownTimer />

                    {/* Copy Image */}
                    <button onClick={copyToClipboard}>
                        {copied ? <Image
                            alt=""
                            src="/images/share/copied.svg"
                            width={500}
                            height={64}
                        /> : <Image
                            alt=""
                            src="/images/share/copy.svg"
                            width={500}
                            height={64}
                        />}

                    </button>
                    {/* How-to Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/how.svg"
                        width={200}
                        height={64}
                        alt=""
                    />

                    <div className="p-4 font-rethink">
                        <ul className="list-disc space-y-0 ml-6">
                            <li className="text-white">
                                Read the Practical Timelock Encryption from Threshold BLS paper
                            </li>
                            <li className="text-white">
                                Try out blocklock-js!
                            </li>
                            <li className="text-white">
                                Meet the Randamu team that built blocklock-js
                            </li>
                            <li className="text-white">
                                Join the FIL Builder telegram
                            </li>
                        </ul>
                    </div>
                    {/* Usecase Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/about.svg"
                        width={200}
                        height={64}
                        alt=""
                    />

                    <About />


                </>}

            </div>

        </>
    )

}