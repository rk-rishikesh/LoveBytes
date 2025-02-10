"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation'
import { Contract, JsonRpcProvider } from "ethers";
import { CONTRACT_ABI } from "../../contract/contractDetails";
import CountdownTimer from "./countdown";

export default function Id() {

    const params = useParams()
    const [message, setUserMessage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {

            try {
                const provider = new JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");

                const contract = new Contract(
                    "0xdAE55018E30929e2992d27e7c4038CBF4FDB9aaf",
                    CONTRACT_ABI,
                    provider
                );

                const owner = await contract.ownerOfRequestId(params.id);
                console.log(owner)

                const lovebyte = await contract.userMessage(owner);
                setUserMessage(lovebyte);
            } catch (error) {
                console.error("Error fetching owner:", error);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <>
            <div className="w-full min-h-screen bg-black flex justify-center p-4 flex-col items-center gap-12 mt-24">
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

                    {/* How-to Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/how.svg"
                        width={200}
                        height={64}
                        alt=""
                    />

                    {/* Steps Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/steps.svg"
                        width={500}
                        height={64}
                        alt=""
                    />

                    {/* Usecase Image */}
                    <Image
                        className="cursor-pointer mt-24"
                        src="/images/share/usecase.svg"
                        width={200}
                        height={64}
                        alt=""
                    />
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
                    <Image
                        alt=""
                        src="/images/share/copy.svg"
                        width={500}
                        height={64}
                    />

                    {/* How-to Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/how.svg"
                        width={200}
                        height={64}
                        alt=""
                    />

                    {/* Steps Image */}
                    <Image
                        className="cursor-pointer"
                        src="/images/share/steps.svg"
                        width={500}
                        height={64}
                        alt=""
                    />

                    {/* Usecase Image */}
                    <Image
                        className="cursor-pointer mt-24"
                        src="/images/share/usecase.svg"
                        width={200}
                        height={64}
                        alt=""
                    />
                </>}

            </div>

        </>
    )

}