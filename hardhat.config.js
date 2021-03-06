require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("mine", "Mines blocks")
  .addParam("blocks", "Number of vlocks to mine")
  .setAction(async (taskArgs, hre) => {
  console.log("Start block: ", await ethers.provider.send("eth_blockNumber"));
  console.log(taskArgs.blocks);
  const b = parseInt(taskArgs.blocks);
  for (let i=0; i<b; i++) await ethers.provider.send("evm_mine"); // mines 5 blocks
  console.log("End block: ", await ethers.provider.send("eth_blockNumber"));
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
