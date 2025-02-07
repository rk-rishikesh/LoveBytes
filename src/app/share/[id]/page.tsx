"use client"

import Image from "next/image";
import { useParams } from 'next/navigation'


export default function Id() {

    const params = useParams()

    console.log(params.id)
    return (
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
                        {/* <Image src="/assets/hero/paper.png" alt="Paper" width={600} height={200}/> */}
                        <div
                            className="w-[600px] h-[200px] px-12 py-10 text-black"
                            style={{
                                backgroundImage: `url("/assets/hero/paper.png")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>he{params.id}Hel</div>
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
        </>
    )

}