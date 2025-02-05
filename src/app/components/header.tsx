"use client"
import Image from "next/image";
import Link from 'next/link'

const Header = () => {

  return (
    <div className="absolute top-0 w-full bg-[#CADDFF] h-20 flex items-center z-10 bg-hero">
      <div className="absolute left-4">
        <Link href="/">
          <Image
            src="/assets/artOne.svg"
            alt="Love"
            width={800}
            height={200}
            className="mt-20"
          />
          
          <div
            className="lg:hidden text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-full shadow-[5px_5px_black] text-center transform transition w-full px-2 py-2"
          >
            <Image
              className="cursor-pointer "
              src="/assets/logo/fil-b-mini-logo.png"
              width={30}
              height={30}
              alt="FIL-B Logo"
            />
          </div>
        </Link>
      </div>
      <div className="absolute right-6">
        <div className="flex flex-row gap-8 items-center">
          <Image
            className="cursor-pointer hidden lg:block"
            src="/assets/logo/logo.svg"
            width={250}
            height={250}
            alt="FIL-B Logo"
          />
          {/* <div className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-[20px] shadow-[5px_5px_black] text-center transform transition w-full lg:px-2 lg:py-2 lg:text-xl px-2 py-2">

            <button type="button">
              <Image
                className="cursor-pointer "
                src="/assets/icons/fvm.png"
                width={30}
                height={30}
                alt="FVM Logo"
              />
            </button>
          </div> */}
        </div>
      </div>
    </div >
  );
};

export default Header;