import React, {useState} from "react";
import axios from "axios";
import {PinataAPI_KEY, PinataAPI_SECRET} from "../Pinata";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {marketaddress, nftaddress} from "../config";
import NFT from '../build/contracts/NFT.json';
import Marketplace from '../build/contracts/Marketplace.json';

// create nft
function C() {
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [nft, setNFT] = useState(null);

    async function createNFT() {
        const url = nft;
        // create the items and list them on the marketplace
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        // we want to create the token
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.mintToken(url)
        let tx = await transaction.wait()
        console.log(tx)
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price_value = ethers.utils.parseUnits(price, 'ether') // this is the price of the item
        // ethers.utils.parseUnits('1.0', 'ether') equals 1.0 ether which is 1000000000000000000 wei
        // wei is the smallest unit of ether

        contract = new ethers.Contract(marketaddress, Marketplace.abi, signer) // this is the marketplace contract
        let listingPrice = await contract.getListingPrice() // this is the listing price
        listingPrice = listingPrice.toString() // this is the listing price
        console.log(listingPrice)
        transaction = await contract.createMarketItem(nftaddress, tokenId, price_value, title, description,true, {value: listingPrice}) // function in the marketplace contract
        await transaction.wait()
        console.log('Item created on the marketplace')
    }

    return (
        <div>
            <p>Create</p>
            <form onSubmit={(event) => {
                event.preventDefault();
                createNFT();
            }}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description"
                           onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="nft">NFT</label>
                    <input type="text" name="nft" id="nft" onChange={(e) => setNFT(e.target.value)}/>
                </div>
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    );
}

export default C;