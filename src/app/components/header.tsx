"use client"
import Image from "next/image";

const Header = () => {

  return (
    <div className="absolute top-0 w-full bg-black h-20 flex items-center z-10 ">
      <div className="absolute left-4">
        <a
          href="https://x.com/FILBuilders"
          className="text-[#FF35D0] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/logo/logo.svg"
            alt="Love"
            width={250}
            height={200}
          />
        </a>
      </div>
      <div className="absolute right-2">
        <div className="flex items-center">
          <a
            href="https://x.com/RandamuAG/"
            className="text-[#FF35D0] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="cursor-pointer w-20 p-3"
              src="/assets/logo/randamu.png"
              width={70}
              height={50}
              alt="FIL-B Logo"
            />
          </a>
        </div>
      </div>
    </div >
  );
};

export default Header;