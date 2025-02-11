import React from 'react';
import Image from 'next/image';
export const About = () => {

    return (
        <div className='flex flex-col justify-start items-start gap-8 text-xl'>
            <div className="flex justify-start items-end text-start font-rethink text-[#FF35D0]">
                <a
                    href="https://github.com/randa-mu/blocklock-js"
                    className="text-[#FF35D0] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >blocklock-js</a>
            </div>
            <Image
                src="/images/share/blocklock.svg"
                width={500}
                height={64}
                alt=""
            />
            <div className="flex justify-start items-end text-start font-rethink text-[#FF35D0]">
                <a
                    href="https://filecoin.io/"
                    className="text-[#FF35D0] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >Filecoin</a>
            </div>
            <Image
                className="cursor-pointer"
                src="/images/share/Filecoin.svg"
                width={465}
                height={64}
                alt=""
            />
        </div>
    )
}