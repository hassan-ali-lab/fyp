const Web3 = require('web3');

// Replace this with your own Ganache endpoint URL
const providerUrl = 'http://localhost:7545';

// Create a new Web3 instance using the provider URL
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Use the web3.eth.getAccounts() function to get the accounts array
web3.eth.getAccounts((error, accounts) => {
    if (error) {
        console.error(error);
        return;
    }

    // Print the accounts array to the console
    console.log(accounts);
});