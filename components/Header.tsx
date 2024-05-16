import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TokenMarqueeTicker from "./TokenMarqueeTicker";

type Props = {};

const Header: React.FC<Props> = ({}) => {
  return (
    <header className="flex flex-col items-center w-screen pt-2 bg-[#0d0f14]">
      <div className="flex w-full justify-between px-4 pt-2">
        <h1 className="text-[32px] italic font-bold text-segoe font-sans antialiased bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          TOKENYZ{" "}
        </h1>
        <ConnectButton />
      </div>
      <TokenMarqueeTicker />
    </header>
  );
};

export default Header;
