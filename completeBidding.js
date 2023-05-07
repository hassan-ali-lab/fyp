const {ethers} = require("ethers");
const {marketaddress} = require("./config");
const json = require("./src/build/contracts/Marketplace.json");
const privateKey = "0x7a032b949fb65344c5ff2bbceb25fdb180a12789dab6b722f2814a8d1354de35"

async function completeBidding(itemId) {
    // create provider
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
    console.log('provider', provider);

    // create wallet
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log('wallet', wallet);

    const contract = new ethers.Contract(marketaddress, json.abi, wallet);
    console.log('contract', contract);

    // call completeBidding function
    const tx = await contract.comBid(itemId, {
        gasLimit: 20000000,
        value: ethers.utils.parseEther("10")
    });

    console.log('transaction hash', tx.hash);
    await tx.wait();
    console.log('transaction confirmed');

    return tx.hash;
}

completeBidding(2).then(r =>    console.log(r));