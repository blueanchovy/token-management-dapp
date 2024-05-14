import { getFormattedBalance } from "@/utils/common";
import React, { useState, useEffect } from "react";

type Token = {
  tokenAddress: string;
  tokenSymbol: string;
  maxPrice: string;
};

const TokenMarqueeTicker: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          "https://arbitrum-api.gmxinfra.io/prices/tickers"
        );
        const data: Token[] = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();

    const intervalId = setInterval(fetchTokens, 40000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-4 w-full">
      <div className="overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...tokens].map((token, index) => (
            <div
              key={`${token.tokenAddress}-${index}`}
              className="flex items-center space-x-4 px-8 py-2 mr-4 bg-gray-800 text-white rounded-lg cursor-pointer"
            >
              {/* <img
                src={`https://example.com/token/${token.tokenSymbol}.png`}
                alt={`${token.tokenSymbol} icon`}
                className="w-6 h-6"
              /> */}
              <p>{token.tokenSymbol}</p>
              <p>Max Price: $ {getFormattedBalance(token.maxPrice)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenMarqueeTicker;
