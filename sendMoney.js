const Web3 = require('web3');
const host = 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(host));

const senderAddress = '0xCc5cEc93214E8ecCDC186faFf4944759A7Fd37A8';
const recipientAddress = "0x00fb854eFb775e2F5304D6B60a45282839A29BDE"
const privateKey = '0x7a032b949fb65344c5ff2bbceb25fdb180a12789dab6b722f2814a8d1354de35';


///home/king/.nvm/versions/node/v18.15.0/bin/node /home/king/WebstormProjects/fyp/CheckMoney.js
// done
// balance 1166646101022622894031
// balance 1166.646101022622894031
//
// Process finished with exit code 0


async function sendMoney() {

    const amountToSend = web3.utils.toWei("30", 'ether'); // sending 1 ETH
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

sendMoney().then(() => console.log('done'))