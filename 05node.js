const Web3 = require('web3');
const {abi:biddingAbi, address:biddingAddress} = require('./src/build/contracts/Bidding.json');
const {biddingAddress: contractAddress} = require('./src/config')


const privateKey = '0x0000f5e80accc2c97a61ba1e94147ad9c02a1fc301886bab9974c947966fa2f4'

const host = 'http://localhost:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(host));

// Set up the account that will make the bid
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

// Create a contract instance
const contract = new web3.eth.Contract(biddingAbi, contractAddress);
function loop() {

}
contract.methods.listBidItems().call().then(async function (res) {
    for (let i = 0; i < res.length; i++) {
        if (res.closed === true) {
            const senderAddress = '0xF4a7D86152679987bb8Ffc39bf448feE72915152';
            const recipientAddress = res[i].auctionStarter;
            const privateKey = '0xbe0962b537695dd6c90bb5f47f9191086c862f2f678c0cc93db570acf07d3c41';

            const amountToSend = web3.utils.toWei(res[i].highestBid, 'wei'); // sending 1 ETH
            const gasPrice = await web3.eth.getGasPrice();
            const gasLimit = 21000;

            const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');
            const tx = {
                from: senderAddress,
                to: recipientAddress,
                value: amountToSend,
                gasPrice: gasPrice,
                gas: gasLimit,
                nonce: nonce
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            console.log('Transaction hash:', txReceipt.transactionHash);
        }
    }
}).catch(function (err) {
    console.log(err);
});
