import Image from "next/image";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-black bg-hero flex items-center flex-col lg:flex-row lg:justify-between gap-4 px-4">
      <div className="flex flex-row gap-8 items-center justify-center mb-4">
        <a
          className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:shadow-none hover:text-white justify-center rounded-full shadow-[5px_5px_black] text-center transform transition w-full px-2 py-2"
          href="https://x.com/FILBuilders"
        >
          <Image
            src="/assets/logo/xLogo.png"
            width={30}
            height={30}
            alt="X Logo"
            className="p-1"
          />
        </a>

        <a
          className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:shadow-none hover:text-white justify-center rounded-full shadow-[5px_5px_black] text-center transform transition w-full px-2 py-2"
          href="https://discord.com/invite/filecoin"
        >
          <Image
            src="/assets/logo/discordLogo.png"
            width={30}
            height={30}
            alt="Discord Logo"
          />
        </a>

        <a
          className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:shadow-none hover:text-white justify-center rounded-full shadow-[5px_5px_black] text-center transform transition w-full px-2 py-2"
          href="https://t.me/+SR5t2Sv1cI1jOWRl"
        >
          <Image
            src="/assets/logo/telegramLogo.png"
            width={30}
            height={30}
            alt="Telegram Logo"
            className="p-1"
          />
        </a>

      </div>
      <div className="flex flex-row gap-2 justify-center items-center mb-2">
      <Image
            src="/assets/artTwo.svg"
            width={800}
            height={30}
            alt="Telegram Logo"
            className="p-1"
          />
      </div>
    </div>
  );
}