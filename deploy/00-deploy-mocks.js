const { network } = require("hardhat")
const {
    deploymentChainLinks,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports.default = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = await deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    console.log("I am here")
    if (deploymentChainLinks.includes(network.name)) {
        console.log("Local chain link detected deploying locally ......")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Deployed")
        log("------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
