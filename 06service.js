const Web3 = require('web3');
const {abi: marketplaceAbi, address: addressMarketplace} = require('./src/build/contracts/Marketplace.json');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const tasks = [];
const marketaddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";//0x884467182849bA788ba89300e176ebe11624C882


const privateKey = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
const host = 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(host));

// Set up the account that will make the bid
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);


// console.log(addressMarketplace)
// Create a contract instance
const contract = new web3.eth.Contract(marketplaceAbi, marketaddress);
console.log(contract.methods)


contract.methods.getAllItems().call().then(async function (res) {
    console.log(res)
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
// app.listen(3003, () => {
//     console.log('Server running on port http://localhost:3000/');
// });
//
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
