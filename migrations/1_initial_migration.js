const fs = require('fs'); // require('fs') is a Node.js module for working with the file system

module.exports = function (deployer) { // deployer is an object that helps us deploy contracts
    // deployer.deploy(Marketplace)
    deployer.then(async function () { // deployer.then() is a promise
        let contractA = await artifacts.require("Marketplace").new(); // deploy the Marketplace contract
        let contractB = await artifacts.require("NFT").new(contractA.address); // deploy the NFT contract
        let contractC = await artifacts.require("Bidding").new(); // deploy the NFT contract
        let contractD = await artifacts.require("Auction").new(); // deploy the NFT contract
        fs.writeFileSync('src/config.js', ` 
export const marketaddress = "${contractA.address}";
export const nftaddress = "${contractB.address}";
export const biddingAddress = "${contractC.address}";
export const auctionAddress = "${contractD.address}";
        `);
    });
}
