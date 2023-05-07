// async function completeBidding(itemType, itemId) {
//     // get provider
//
//     const provider = new ethers.providers.JsonRpcProvider(host);
//     console.log('provider', provider)
//     const wallet = new ethers.Wallet(privateKey, provider);
//     const contract = new ethers.Contract(marketaddress, marketJson.abi, wallet);
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
//         'Content-Type': 'application/marketJson',
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
//         'Content-Type': 'application/marketJson',
//     };
//
//     res.send(JSON.stringify({status: 'ok'}));
// })
//
// //
//
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
