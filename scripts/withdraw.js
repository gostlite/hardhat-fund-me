const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    // const fundMe = await fundMecontract.deploy()

    console.log("deploying contract ...........")
    // await fundMe.deploymentTransaction().wait(1)

    const transactionResponse = await fundMe.withdraw()

    await transactionResponse.wait(1)

    console.log("withdraw")
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
