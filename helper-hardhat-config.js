const networkConfig = {
    11155111: {
        name: "Sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
}

const deploymentChainLinks = ["hardhat", "localhost"]

const DECIMALS = 8
const INITIAL_ANSWER = 20000000000
module.exports = {
    networkConfig,
    deploymentChainLinks,
    DECIMALS,
    INITIAL_ANSWER,
}
