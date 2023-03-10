// const Marketplace = artifacts.require('Marketplace')
// const NFT = artifacts.require('NFT')
// // const provider = new web3.providers.HttpProvider("http://localhost:7545");
const fs = require('fs')

module.exports = function (deployer) {
    deployer.then(async function () {
        let contractA = await artifacts.require("Marketplace").new();
        let contractB = await artifacts.require("NFT").new(contractA.address);
        fs.writeFileSync('src/config.js', `
export const marketaddress = "${contractA.address}"
export const nftaddress = "${contractB.address}"
        `)
    });
    // deployer.deploy(Marketplace)
    // Option 2) Console log the address:
    // .then(() => console.log(Marketplace.address))
    // // Option 3) Retrieve the contract instance and get the address from that:
    // .then(() => Marketplace.deployed())
    // .then(_instance => {
    //      console.log(_instance.address)
    // }
    // );
}



// module.exports = function (d) {
//     d.deploy(NFT,_instance.address);
// }
