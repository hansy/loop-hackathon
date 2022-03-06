import { ethers } from "ethers";

const USD_TO_MATIC = 1.5;

export const usdToMatic = (cents: number) => {
  return Number((cents / (USD_TO_MATIC * 100)).toFixed(5));
};

export const gweiToMatic = (gwei: number) => {
  return Number((gwei / Math.pow(10, 18)).toFixed(5));
};

export const maticToUsd = (matic: number) => {
  return Number((matic * USD_TO_MATIC).toFixed(2));
};

export const usdToGwei = (cents: number) => {
  const numMatic = usdToMatic(cents);

  return ethers.utils.parseEther(numMatic.toFixed(18));
};
