require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    deployments: "deployments",
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
    },
    /*
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 1337,
        }
  */
  },
};
