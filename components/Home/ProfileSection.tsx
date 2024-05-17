import React from "react";
import BreadCrumb from "../common/BreadCrumb";

type Props = {
  accounts: string[];
  balances: { [key: string]: string };
  getBalance: (account: string | null) => Promise<void>;
};

const ProfileSection = ({ accounts, balances, getBalance }: Props) => {
  return (
    <div className="flex flex-col pr-3 ">
      <BreadCrumb section={"Profile"} />
      <img src="/profileCover.svg" width="auto" height="16rem" alt="cover" />

      {accounts.map((account) => (
        <div key={account} className="flex flex-col  pb-24">
          <div className="rounded-md py-4 border-white-50 ">
            <img
              src="/profileAvatar.svg"
              width="76px"
              height="76px"
              alt="avatar"
              className="rounded-md "
            />
            <p className="text-xl py-2">Tokenyz User</p>
          </div>
          <div className="flex flex-col  items-left w-[max-content] text-xl justify-start">
            <p className="mb-4   rounded-md text-white">
              <span className="text-green-400 font-bold">Account: </span>
              {account}{" "}
            </p>
            {/* <div className="flex items-center justify-center">
              <button
                onClick={async () => {
                  await getBalance(account);
                }}
                className="p-2 bg-blue-400  rounded mr-2"
              >
                Refresh Balance
              </button>
            </div> */}

            <p className=" rounded-md text-white">
              {balances[account] !== undefined ? (
                balances[account] !== "0" ? (
                  <>
                    <span className="text-green-500 font-bold">Balance: </span>{" "}
                    {balances[account] + " Eth"}
                  </>
                ) : (
                  "Balance: 0.0"
                )
              ) : (
                "Balance: ...Loading"
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSection;
