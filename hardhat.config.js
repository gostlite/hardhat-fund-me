require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
// require("@nomiclabs/hardhat-etherscan")
require("@nomicfoundation/hardhat-verify")
// require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

// /** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIARPURL = process.env.RCP_URL
const PRIVATEKEY = process.env.PRIVATE_KEY
const ETHERSACN_API = process.env.ETHERSCAN_API
const COINMARKET_CAP = process.env.COINMARKET_API
module.exports = {
    networks: {
        sepolia: {
            url: SEPOLIARPURL,
            accounts: [PRIVATEKEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            accounts: [
                "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
            ],
        },
    },
    defaultNetwork: "hardhat",
    // solidity: "0.8.24",
    solidity: {
        compilers: [{ version: "0.8.24" }, { version: "0.6.6" }],
    },
    etherscan: {
        apiKey: ETHERSACN_API,
    },
    gasReporter: {
        enabled: true,
        outputFile: "./gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_CAP,
        token: "MATIC,",
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
