import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";

// const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
// const OPTIMISM_KOVAN_URL = process.env.OPTIMISM_KOVAN;
// const RINKEBY_URL = process.env.RINKEBY;
// const MUMBAI_URL = process.env.MUMBAI;

const config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: [1000, 5000],
      },
      chainId: 1337,
    },
    //  optimism: {
    //    url: OPTIMISM_KOVAN_URL,
    //    accounts: [PRIVATE_KEY],
    //  },
    //  rinkeby: {
    //    url: RINKEBY_URL,
    //    accounts: [PRIVATE_KEY],
    //  },
    //  mumbai: {
    //    url: MUMBAI_URL,
    //    accounts: [PRIVATE_KEY],
    //  },
  },
  solidity: "0.8.4",
  typechain: {
    outDir: "../frontend/src/typechain", //"typechain" for working ONLY in hardhat
    target: "ethers-v5",
  },
};

export default config;
