const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { deploy, log } = deployments
const { assert } = require("chai")
describe("Fund me test ", function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture("all")
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await deploy("Mocksv3Aggregator", {
            from: deployer,
        })
    })
    describe("constructor test", async function () {
        it("sets the aggregator address correctly", async () => {
            const response = await fundMe.priceFeed
            assert.equal(response, mockV3Aggregator.address)
        })
    })
})
