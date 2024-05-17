import { getFormattedBalance } from "@/utils/common";
import React, { useState, useEffect } from "react";

type Token = {
  tokenAddress: string;
  tokenSymbol: string;
  maxPrice: string;
};

type CoinData = {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
  };
};

const TokenMarqueeTicker: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [coinsData, setCoinsData] = useState<any[]>([]);
  const [logoCache, setLogoCache] = useState<{ [key: string]: string }>({}); // Cache for logos

  useEffect(() => {
    const fetch = require("node-fetch");

    const fetchAllCoins = async () => {
      const url1 = "https://api.coingecko.com/api/v3/coins/list";
      const options1 = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_KEY,
        },
      };

      try {
        const res = await fetch(url1, options1);
        const allCoins = await res.json();
        return allCoins;
      } catch (err) {
        console.error("Error fetching all coins:", err);
        return [];
      }
    };

    const fetchCoinData = async (coinId: string) => {
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_KEY,
        },
      };

      try {
        const res = await fetch(url, options);
        const coinData = await res.json();
        return coinData;
      } catch (err) {
        console.error(`Error fetching data for coin ${coinId}:`, err);
        return null;
      }
    };

    const fetchData = async () => {
      const allCoins = await fetchAllCoins();
      const matchedTokens = tokens.map((token) => {
        const matchedCoin = allCoins.find(
          (coin: { symbol: string }) =>
            coin.symbol.toLowerCase() === token.tokenSymbol.toLowerCase()
        );
        return { ...token, id: matchedCoin ? matchedCoin.id : null };
      });

      const newCoinsDataPromises = matchedTokens.map(async (token) => {
        if (token.id && !logoCache[token.tokenSymbol.toLowerCase()]) {
          const coinData = await fetchCoinData(token.id);
          if (coinData) {
            setLogoCache((prevCache) => ({
              ...prevCache,
              [token.tokenSymbol.toLowerCase()]: coinData.image.thumb,
            }));
            return { ...token, coinData };
          }
        } else {
          return {
            ...token,
            coinData: {
              image: { thumb: logoCache[token.tokenSymbol.toLowerCase()] },
            },
          };
        }
        return { ...token, coinData: null };
      });

      const newCoinsDataResults = await Promise.all(newCoinsDataPromises);

      setCoinsData(newCoinsDataResults);
    };

    if (tokens.length > 0) {
      fetchData();
    }
  }, [tokens, logoCache]);

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
    <div className="mt-4 w-full bg-[#0e0f15] border-t-[0.5px] border-indigo-500">
      <div className="overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {coinsData.map((data, index) => {
            console.log(data);
            return (
              <div
                key={`${data.tokenAddress}-${index}`}
                className="flex items-center space-x-4 px-4 py-2 mr-4 text-white rounded-lg cursor-pointer"
              >
                {data.coinData && data.coinData.image ? (
                  <img
                    src={data.coinData.image.thumb}
                    alt={`${data.coinData.name} icon`}
                    className="w-6 h-6"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                )}
                <p className="text-blue-400">{data.tokenSymbol}</p>
                <p>
                  $ {parseFloat(getFormattedBalance(data.maxPrice)) / 10000}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TokenMarqueeTicker;
