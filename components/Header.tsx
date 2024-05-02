import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <header className="flex justify-end items-center w-screen p-2">
      <ConnectButton />
    </header>
  );
}

export default Header;
