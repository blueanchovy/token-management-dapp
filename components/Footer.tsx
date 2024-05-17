import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="fixed bottom-0 w-full bg-blue-950">
      <span className="flex items-center justify-center text-sm">
        Coin logos powered by{" "}
        <a
          className="text-blue-500 text-underline ml-1"
          href="https://coingecko.com"
        >
          CoinGecko
        </a>
      </span>
    </div>
  );
};

export default Footer;
