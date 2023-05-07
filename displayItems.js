const {ethers} = require("ethers");
const {marketaddress} = require("./config");
const json = require("./src/build/contracts/Marketplace.json");
const privateKey = "0x7a032b949fb65344c5ff2bbceb25fdb180a12789dab6b722f2814a8d1354de35"
const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(marketaddress, json.abi, wallet);

async function getMarketItem(itemId) {
    const value = await contract.getMarketItem(itemId);
    const obj = {
        itemType: value['itemType'].toNumber(),
        itemId: value['itemId'].toNumber(),
        nftContract: value['nftContract'],
        tokenId: value['tokenId'].toNumber(),
        name: value['name'],
        description: value['description'],
        creator: value['creator'],
        _owner: value['_owner'],
        price: value['price'].toNumber(),
        forSale: value['forSale']
    }
    console.log('obj', obj);
}

async function getBidItem(itemId) {
    const value = await contract.getBidItem(itemId);
    const obj = {
        itemType: value['itemType'].toNumber(),
        itemId: value['itemId'].toNumber(),
        nftContract: value['nftContract'],
        tokenId: value['tokenId'].toNumber(),
        name: value['name'],
        description: value['description'],
        creator: value['creator'],
        _owner: value['_owner'],
        price: value['price'].toNumber(),
        forSale: value['forSale']
    }
    console.log('obj', obj);
}

async function getAuctionItem(itemId) {
    return await contract.getAuctionItem(itemId);
}


export {getMarketItem, getBidItem, getAuctionItem}

