const Web3 = require('web3');
const {marketaddress, nftaddress} = require('./config.js');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const {BigNumber, ethers} = require("ethers");
const marketJson = JSON.parse(fs.readFileSync('./src/build/contracts/Marketplace.json', 'utf8'));
const {privateKey, publicKey} = require('./Keys');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const host = 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(host));
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(marketaddress, marketJson.abi, wallet);


async function completeBidding(itemId, price) {
    // call completeBidding function
    const tx = await contract.comBid(itemId, {
        gasLimit: 20000000,
        value: ethers.utils.parseEther(price)
    });
    await tx.wait();
    console.log('transaction confirmed');
    return tx.hash;
}

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

let activeActions = [];
setInterval(async () => {
    if (activeActions.length > 0) {
        for (let i = 0; i < activeActions.length; i++) {
            const itemType = activeActions[i][0];
            const itemId = activeActions[i][1];
            const auctionItem = await getAuctionItem(itemId);
            const wei = ethers.utils.parseUnits(auctionItem.highestBid.toString(), 'wei');
            if (!(await isClosed(itemType, itemId))) {
                console.log('auction is not closed', 'itemType', itemType.toString(), 'item Id', itemId.toString());
            } else {
                const tx = await contract.completeAuction(itemId, {
                    gasLimit: 20000000,
                    value: wei
                });
                console.log('transaction confirmed', tx, 'itemType', itemType.toString(), 'itemId', itemId.toString());
                activeActions = activeActions.filter(item => item[0].toString() !== itemType.toString())
            }
        }
    }
}, 10000);
app.post('/', (req, response) => {
    response.headers = {
        'Content-Type': 'application/marketJson',
    };
    const {itemType, itemId} = req.body;
    if (itemType === undefined || itemId === undefined) {
        response.status(200).send(JSON.stringify({success: false, status: 'failed'}));
        return;
    } else {
        const itemTypeBigNumber = BigNumber.from(`${itemType}`);
        const itemIdBigNumber = BigNumber.from(`${itemId}`);
        if (itemType === 2) {

            isClosed(itemTypeBigNumber, itemIdBigNumber).then(
                async function (res) {
                    if (res) {
                        const bidItem = await getBidItem(itemIdBigNumber);
                        if (bidItem.completed) {
                            response.send(JSON.stringify({success: false, status: 'completed'}));
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
            })
        } else if (itemType === 3) {
            console.log('auction');
            contract.getTime().then((res) => {
                console.log(res.toNumber())
            })
            activeActions.push([itemTypeBigNumber, itemIdBigNumber]);
        }

    }
    response.send(JSON.stringify({success: 'true', status: 'ok'}));
})
app.listen(3003, () => {
    console.log('Server running on port http://localhost:3003/');
});
