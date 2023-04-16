const Web3 = require('web3');
const fs = require('fs');
const NFT_ABI = require('../src/build/contracts/NFT.json');

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);
// https://gateway.pinata.cloud/ipfs/QmSpT3YUxBA5snCh8XBsr56vS1bc3YdHDgKjXQ6kPi1MxH?_gl=1*14msibv*rs_ga*NzQ1MjA5MWQtYTQwOS00NTdlLWJmNWUtMTBjZGJiZDIxMGJh*rs_ga_5RMPXG14TE*MTY4MTU5MTY3Ni4xLjEuMTY4MTU5MTY5MS40NS4wLjA.
//QmSpT3YUxBA5snCh8XBsr56vS1bc3YdHDgKjXQ6kPi1MxH

const privateKey = '141e3b3A22ff1bf40F9ADC1B3A411abc32de422b';

const nftContractAddress = '<YOUR_NFT_CONTRACT_ADDRESS>';

const nftContract = new web3.eth.Contract(NFT_ABI, nftContractAddress);

const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const tokenURI = 'ipfs://<YOUR_IPFS_CID>';

async function mintToken() {
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account.address, 'latest');
    const gasLimit = 1000000;
    const txData = nftContract.methods.mintToken(tokenURI).encodeABI();
    const tx = {
        from: account.address,
        to: nftContractAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: txData
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('NFT minted with token ID:', txReceipt.events.Transfer.returnValues.tokenId);
}

mintToken();
