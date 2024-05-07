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
