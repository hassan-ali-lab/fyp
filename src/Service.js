import Web3 from "web3";
import {marketaddress, nftaddress} from "./config.js";
import marketJson from './build/contracts/Marketplace.json';
import {BigNumber, ethers} from "ethers";

// const marketJson = JSON.parse(`./build/contracts/Marketplace.json', 'utf8'));
// import {privateKey, publicKey} from "../Keys";

const privateKey = '0x191f30922e06675f395ffd8be60149fb43dcafbb34a9a7770c904505581bc387'


const host = 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(host));
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

web3.eth.accounts.wallet.add(account);
const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(marketaddress, marketJson.abi, wallet);
const getBidItem = async function (itemId) {
    const bidItem = await contract.getBidItem(itemId);

    return {
        itemType: bidItem.itemType.toNumber(),
        itemId: bidItem.itemId.toNumber(),
        highestBidder: bidItem.highestBidder,
        highestBid: bidItem.highestBid.toString(),
        counter: bidItem.counter.toNumber(),
        closed: bidItem.closed,
        completed: bidItem.completed
    };
}
const getAuctionItem = async function (itemId) {
    const auctionItem = await contract.getAuctionItem(itemId);

    return {
        itemType: auctionItem.itemType.toNumber(),
        itemId: auctionItem.itemId.toNumber(),
        highestBidder: auctionItem.highestBidder,
        highestBid: auctionItem.highestBid.toString(),
        auctionEndTime: auctionItem.auctionEndTime.toNumber(),
        counter: auctionItem.counter.toNumber(),
        closed: auctionItem.closed,
        completed: auctionItem.completed
    }
}
const isClosed = async function (itemType, itemId) {
    return await contract.isClosed(itemType, itemId);
}

export const closeBid = async function (itemId) {
    const itemTypeBigNumber = BigNumber.from('2');
    const itemIdBigNumber = BigNumber.from(itemId);
    isClosed(itemTypeBigNumber, itemIdBigNumber).then(
        async function (res) {
            if (res) {
                const bidItem = await getBidItem(itemIdBigNumber);
                if (bidItem.completed) {
                    console.log('already completed')
                } else {
                    const wei = ethers.utils.parseUnits(bidItem.highestBid.toString(), 'wei');
                    console.log(wei.toString());
                    const tx = await contract.completeBidding(itemIdBigNumber, {
                        gasLimit: 20000000,
                        value: wei
                    });
                    console.log('transaction confirmed', tx);
                }
            }
        }).catch(function (err) {
        console.log(err);
    });
}
