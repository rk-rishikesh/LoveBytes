"use client"

import Image from "next/image";


export default function Dummy() {
  return (
    <>
      <div className="w-full min-h-screen bg-black flex justify-center p-2 flex-col items-center">
        <div className="flex flex-row gap-0">
          <Image
            className="cursor-pointer "
            src="/assets/hero/lovebyte.svg"
            width={600}
            height={615}
            alt="FIL-B Logo"
          />
        </div>
        <div className="mt-16 mb-10 px-8 flex justify-center flex-col items-center">
          <Image alt="" src="assets/hero/text.svg" width={280} height={64} className="mb-10" />

          <textarea
            id="paperTextarea"
            className="w-[600px] h-[200px] px-16 py-10 resize-y
                     text-gray-800 placeholder-gray-500
                     bg-transparent outline-none "
            placeholder="Write your love byte..."
            style={{
              backgroundImage: `url("/assets/hero/paper.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>


        <div className="flex flex-row gap-0">
          <Image
            className="cursor-pointer "
            src="/assets/hero/cta.svg"
            width={240}
            height={40}
            alt="FIL-B Logo"
          />
        </div>
      </div>
    </>
  )

}