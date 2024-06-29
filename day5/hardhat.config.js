require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require("./tasks/accounts");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");


/** @type import('hardhat/config').HardhatUserConfig */

const sepolia_url = process.env.SEPOLIA_RPC_URL;
const sepolia_private_key = process.env.SEPOLIA_PRIVATE_KEY;
const ETH_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY



module.exports = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETH_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-reporter.txt",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
        url: sepolia_url,
        accounts: [sepolia_private_key],
        chainId: 11155111,
    },
  }
};
