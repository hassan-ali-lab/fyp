const fs = require('fs');
module.exports = function (deployer) {
    deployer.then(async function () {
        let contractA = await artifacts.require("Marketplace").new(); // deploy the Marketplace contract
        let contractB = await artifacts.require("NFT").new(contractA.address); // deploy the NFT contract
        fs.writeFileSync('src/config.js', ` 
export const marketaddress = "${contractA.address}";
export const nftaddress = "${contractB.address}";
        `);
    });
}
