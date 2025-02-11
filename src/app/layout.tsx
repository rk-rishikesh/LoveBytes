import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Rethink_Sans } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { M_PLUS_Code_Latin } from "next/font/google";
import ContextProvider from './providers';
import ReactQueryProvider from './ReactQueryProvider';

import { Buffer } from 'buffer';
import process from 'process';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.process = process;
}

const rethinkSans = Rethink_Sans({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"] });
const mPlusCodeLatin = M_PLUS_Code_Latin({ weight: "400", subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love Byte",
  description: "No turtlenecks required",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rethinkSans.className} ${robotoMono.className} ${mPlusCodeLatin.className} antialiased`}
      >
        <ReactQueryProvider>
          <ContextProvider>
            {children}
          </ContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
