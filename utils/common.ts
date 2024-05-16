import Web3, { Numbers } from "web3";

export const getFormattedBalance = (
  balance: bigint | Numbers | number
): string => {
  const formattedBalance = Web3.utils.fromWei(balance, "ether");
  console.log(formattedBalance);
  // Check if the balance is exactly 0
  if (formattedBalance === "0" || formattedBalance === "0.") {
    return "0.0";
  } else {
    return formattedBalance;
  }
};

export const abi = [
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
