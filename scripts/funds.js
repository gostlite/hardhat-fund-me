const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    // const fundMe = await fundMecontract.deploy()

    console.log("deploying contract ...........")
    // await fundMe.deploymentTransaction().wait(1)
    // console.log(await fundMe.getOwner().toString())

    const transactionResponse = await fundMe.fund({
        value: ethers.parseEther("0.1"),
    })

    await transactionResponse.wait(1)

    console.log("funded")
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
