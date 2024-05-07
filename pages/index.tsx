import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import Web3, { Numbers } from "web3";
import { getFormattedBalance } from "@/utils/common";

export default function Home() {
  const [web3Object, setWeb3Object] = useState<Web3 | null>(null);
  const [web3ObjectInitialized, setWeb3ObjectInitialized] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [ERC20TokenDetails, setERC20TokenDetails] = useState<{
    [key: string]: string;
  } | null>(null);

  console.log(balances);

  const provider = `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
  const erc20 = new Web3(provider);
  const token_contract_address = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  const abi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
  ];
  const contract = new erc20.eth.Contract(abi, token_contract_address);

  useEffect(() => {
    if (!accounts || accounts.length === 0) return;

    async function getTokenBalance() {
      try {
        let result: Numbers = await contract?.methods
          ?.balanceOf(accounts[0])
          ?.call();
        let name: string = await contract?.methods?.name(accounts[0])?.call();
        let etherValue: string | null = getFormattedBalance(result);
        console.log(name, etherValue);
        setERC20TokenDetails({ [name]: etherValue });
      } catch (error) {
        console.error("Error fetching token balance:", error);
      }
    }

    getTokenBalance();
  }, [accounts]);

  useEffect(() => {
    let isMounted = true;

    async function getWeb3Object() {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        try {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          if (isMounted) {
            setWeb3Object(web3);
            setWeb3ObjectInitialized(true);
          }
          return web3;
        } catch (e) {
          console.error("Error enabling Ethereum:", e);
          return null;
        }
      } else {
        console.error("Wallet not installed or not detected.");
        return null;
      }
    }

    if (!web3ObjectInitialized) {
      getWeb3Object();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const getBalance = async (account: string | null) => {
    try {
      if (account && web3Object) {
        let balance = await web3Object.eth.getBalance(account);
        let formattedBalance = getFormattedBalance(balance);
        setBalances((prev) => ({
          ...prev,
          [account]: formattedBalance,
        }));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    const getBalances = async (accounts: string[] | null) => {
      try {
        const balances: { [key: string]: string } = {};
        if (accounts && web3Object) {
          for (const account of accounts) {
            let balance = await web3Object.eth.getBalance(account);
            balances[account] = getFormattedBalance(balance);
          }
          setBalances(balances);
        }
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    const fetchAccounts = async () => {
      if (web3Object) {
        try {
          const accounts = await web3Object.eth.getAccounts();
          setAccounts(accounts);
          await getBalances(accounts);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      }
    };

    fetchAccounts();

    // Function to refresh balances
    const refreshBalances = async () => {
      // Check if web3Object and accounts are available
      if (web3Object) {
        // Call the getBalances function to update balances
        await getBalances(accounts);
      }
    };

    // Add event listener for network change
    if (window.ethereum) {
      window.ethereum.on("chainChanged", refreshBalances);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", refreshBalances);
      }
    };
  }, [web3Object]);

  return (
    <DefaultLayout>
      <div>
        {accounts && accounts[0] && (
          <>
            {accounts.map((account) => (
              <div key={account} className="flex space-x-2">
                <p>
                  Account: {account} {"   "}
                </p>
                <button
                  onClick={async () => {
                    await getBalance(account);
                  }}
                  className=" p-2 bg-blue-400 mb-6 rounded"
                >
                  Refresh Balance
                </button>
                <p>
                  {balances[account] !== undefined
                    ? balances[account] !== "0"
                      ? "Balance: " + balances[account] + " Eth"
                      : "Balance: 0.0"
                    : "Balance: ...Loading"}
                </p>
              </div>
            ))}
            {ERC20TokenDetails && (
              <p>
                ERC20 Token Details :{" "}
                {Object.values(ERC20TokenDetails) +
                  " " +
                  Object.keys(ERC20TokenDetails)}
              </p>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
