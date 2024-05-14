import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TokenMarqueeTicker from "./TokenMarqueeTicker";

type Props = {};

const Header: React.FC<Props> = ({}) => {
  return (
    <header className="flex flex-col items-center w-screen p-2">
      <div className="flex w-full justify-end">
        <ConnectButton />
      </div>
      <TokenMarqueeTicker />
    </header>
  );
};

export default Header;
