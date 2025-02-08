"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation'
import { Contract, JsonRpcProvider } from "ethers";
import { CONTRACT_ABI } from "../../contract/contractDetails";

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
            {message == "" ?
                <>
                    <div className="w-full min-h-screen bg-black flex bg-hero justify-center p-2 flex-col items-center">
                        <div className="flex flex-row gap-0">
                            <Image
                                className="cursor-pointer "
                                src="/assets/share/topText.svg"
                                width={600}
                                height={615}
                                alt="FIL-B Logo"
                            />
                        </div>
                        <div className="px-8 flex justify-center flex-col items-center">
                            <Image
                                alt=""
                                src="/assets/share/date.svg"
                                width={500}
                                height={64}
                            />
                        </div>

                        <div className="flex flex-row gap-0">
                            <Image
                                className="cursor-pointer "
                                src="/assets/share/bottomtext.svg"
                                width={220}
                                height={40}
                                alt="FIL-B Logo"

                            />
                        </div>
                    </div>
                </> :

                <>
                    <div className="w-full min-h-screen bg-black bg-hero flex justify-center p-2 flex-col items-center">
                        <div className="flex flex-row gap-0">
                            <Image
                                className="cursor-pointer "
                                src="/assets/share/text.svg"
                                width={600}
                                height={615}
                                alt="FIL-B Logo"
                            />
                        </div>
                        <div className="mt-16 mb-10 px-8 flex justify-center flex-col items-center">

                            <div className="">
                                <div
                                    className="w-[600px] h-[200px] px-12 py-10 text-black"
                                    style={{
                                        backgroundImage: `url("/assets/hero/paper.png")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}>{message}</div>
                            </div>
                        </div>


                        <div className="flex flex-row gap-0">
                            <Image
                                className="cursor-pointer "
                                src="/assets/share/check.svg"
                                width={350}
                                height={40}
                                alt="FIL-B Logo"

                            />
                        </div>
                    </div>
                </>}

        </>
    )

}