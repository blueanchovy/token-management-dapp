import DefaultLayout from "@/layouts/DefaultLayout"; // Assuming correct alias setup
import Web3 from "web3";
import { useEffect, useState } from "react";

export default function Home() {
  const [web3Object, setWeb3Object] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [balances, setBalances] = useState<{ [key: string]: bigint }>({});
  const [web3ObjectInitialized, setWeb3ObjectInitialized] = useState(false);

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
  }, [web3Object, web3ObjectInitialized]);

  const getBalance = async (account: string | null) => {
    try {
      if (account && web3Object) {
        const balance = await web3Object.eth.getBalance(account);
        setBalances((prev) => ({ ...prev, [account]: balance }));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    const getBalances = async (accounts: string[] | null) => {
      try {
        const balances: { [key: string]: bigint } = {};
        if (accounts && web3Object) {
          for (const account of accounts) {
            const balance = await web3Object.eth.getBalance(account);
            balances[account] = balance;
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
                    ? "Balance: " + balances[account]?.toString()
                    : "...Loading"}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}
