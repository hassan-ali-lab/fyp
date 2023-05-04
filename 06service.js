const Web3 = require('web3');
const {marketaddress, nftaddress} = require('./config.js');
// const {abi: marketplaceAbi, address: addressMarketplace} = require('./src/build/contracts/Marketplace.json');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const {BigNumber, ethers} = require("ethers");
const json = JSON.parse(fs.readFileSync('./src/build/contracts/Marketplace.json', 'utf8'));

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const privateKey = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
const host = 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(host));
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const contract = new web3.eth.Contract(json.abi, marketaddress);
console.log(contract.methods)

// async function completeBidding(itemType, itemId) {
//     // get provider
//
//     const provider = new ethers.providers.JsonRpcProvider(host);
//     console.log('provider', provider)
//     const wallet = new ethers.Wallet(privateKey, provider);
//     const contract = new ethers.Contract(marketaddress, json.abi, wallet);
//     // console.log('contract', contract);
//     console.log('contract', contract)
//     console.log('contract', contract.methods)
//     // const nonce = await wallet.getTransactionCount();
//     //
//     //
//     // const tx = await contract["completeBidding"](
//     //     itemType,
//     //     itemId,
//     //     {
//     //         nonce: nonce,
//     //         gasLimit: 20000000,
//     //     });
//     //
//     // return await tx.wait();
// }
async function completeBidding(itemType, itemId) {
    // create provider
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
    console.log('provider', provider);

    // create wallet
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log('wallet', wallet);

    // create contract instance
    const json = require("./src/build/contracts/Marketplace.json"); // replace with actual JSON file path
    const contract = new ethers.Contract(marketaddress, json.abi, wallet);
    console.log('contract', contract);

    // call completeBidding function
    const tx = await contract.completeBidding(itemType, itemId, {
        gasLimit: 20000000,
    });

    console.log('transaction hash', tx.hash);
    await tx.wait();
    console.log('transaction confirmed');

    return tx.hash;
}

async function getMarketItem(itemId) {
    return await contract.methods.getMarketItem(itemId).call();
}

async function getBidItem(itemId) {
    return await contract.methods.getBidItem(itemId).call();
}

let senderAddress;
// get accounts
web3.eth.getAccounts().then(async (res) => {
    senderAddress = res[0];
});
app.post('/', (req, res) => {
    // get post data
    res.headers = {
        'Content-Type': 'application/json',
    };
    const {itemType, itemId} = req.body;


    contract.methods.isClosed(BigNumber.from(`${itemType}`), BigNumber.from(`${itemId}`)).call().then(async (res) => {
        console.log(res)
        try {
            if (res) {
                completeBidding(itemType, itemId).then(async (res) => {
                    console.log('---------------------------------')
                    //     console.log('Bidding Closed', {res}, {itemType, itemId});
                    //     console.log('---------------------------------')
                    //
                    //     getMarketItem(itemId).then(async (res) => {
                    //         console.log(res._owner)
                    //
                    //         const recipientAddress = res._owner;
                    //         console.log('recipientAddress', recipientAddress)
                    // getBidItem(itemId).then(async (res) => {
                    //     const amountToSend = web3.utils.toWei(res.highestBid, 'wei'); // sending 1 ETH
                    //     const gasPrice = await web3.eth.getGasPrice();
                    //            const gasLimit = 210000;
                    // console.log('amountToSend', amountToSend)
                    // console.log('gasLimit', gasLimit)
                    // console.log('gasPrice', gasPrice)

                    // const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');
                    // console.log('nonce', nonce)
                    /*  const tx = {
                        from: senderAddress,
                        to: recipientAddress,
                        value: amountToSend,
                        gasPrice: gasPrice,
                        gas: gasLimit,
                        nonce: nonce
                    };

                    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
                    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

                    console.log('Transaction hash:', txReceipt.transactionHash);*/

                    // }).catch(function (err) {
                    //     console.log(err);
                    // });


                    // }).catch(function (err) {
                    //     console.log(err);
                    // });
                })
            } else {
                console.log('Bidding Not Closed', {res}, {itemType, itemId});

            }
        } catch (e) {
            console.log(e)
        }
    }).catch(function (err) {
        console.log(err);
    });
//
    res.send(JSON.stringify({status: 'ok'}));
})
// app.get('/auction/:id', (req, res) => {
//     const {id} = req.params;
//     console.log(id)
//     contract.methods.listBidItems().call().then(async function (res) {
//         console.log(res)
//     }).catch(function (err) {
//     });
//     // contract.methods.isClosed(id).call().then(async function (res) {
//     //     console.log(res)
//     // }).catch(function (err) {
//     //     console.log(err);
//     // });
//     // setTimeout(() => {
//     //     for (let i = 0; i < tasks.length; i++) {
//     //         let task = tasks[i];
//     //
//     //         contract.methods.isClosed(id).call().then(async function (res) {
//     //             console.log(res)
//     //         }).catch(function (err) {
//     //             console.log(err);
//     //         });
//     //
//     //     }
//     // }, 1000);
//     res.headers = {
//         'Content-Type': 'application/json',
//     };
//
//     res.send(JSON.stringify({status: 'ok'}));
// })
// app.get('/bidding/:id', (req, res) => {
//     const {id} = req.params;
//     setTimeout(() => {
//         for (let i = 0; i < tasks.length; i++) {
//             let task = tasks[i];
//
//             console.log(task)
//         }
//     }, 1000);
//     res.headers = {
//         'Content-Type': 'application/json',
//     };
//
//     res.send(JSON.stringify({status: 'ok'}));
// })
//
// //
//
//
app.listen(3003, () => {
    console.log('Server running on port http://localhost:3003/');
});

//
// //
// contract.methods.listBidItems().call().then(async function (res) {
//     for (let i = 0; i < res.length; i++) {
//         if (res.closed === true) {
//             const senderAddress = '0xF4a7D86152679987bb8Ffc39bf448feE72915152';
//             const recipientAddress = res[i].auctionStarter;
//             const privateKey = '0xbe0962b537695dd6c90bb5f47f9191086c862f2f678c0cc93db570acf07d3c41';
//
//             const amountToSend = web3.utils.toWei(res[i].highestBid, 'wei'); // sending 1 ETH
//             const gasPrice = await web3.eth.getGasPrice();
//             const gasLimit = 21000;
//
//             const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');
//             const tx = {
//                 from: senderAddress,
//                 to: recipientAddress,
//                 value: amountToSend,
//                 gasPrice: gasPrice,
//                 gas: gasLimit,
//                 nonce: nonce
//             };
//
//             const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
//             const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//
//             console.log('Transaction hash:', txReceipt.transactionHash);
//         }
//     }
// }).catch(function (err) {
//     console.log(err);
// });
