const { network } = require("hardhat")
const { chainId } = network.config

const {
    deploymentChainLinks,
    networkConfig,
} = require("../helper-hardhat-config")
let ethUsdAddress

// console.log(!deploymentChainLinks.includes(network.name))
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = await deployments
    const { deployer } = await getNamedAccounts()
    if (deploymentChainLinks.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdAddress = ethUsdAggregator.address
    } else ethUsdAddress = networkConfig[chainId].ethUsdPriceFeed

    console.log(ethUsdAddress)
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdAddress],
        log: true,
    })
    console.log(fundMe.address)

    console.log(`owner is ${await fundMe.getOwner()}`)
}
//
module.exports.tags = ["all", "fundme"]
