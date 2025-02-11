import React from 'react';
import Image from 'next/image';
export const About = () => {

    return (
        <div className='flex flex-col justify-start items-start gap-8'>
             <div className="flex justify-start items-end text-start font-rethink">
                blocklock-js
            </div>
            <Image
                src="/images/share/blocklock.svg"
                width={500}
                height={64}
                alt=""
            />
            <div className="flex justify-start items-end text-start font-rethink">
                Filecoin
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