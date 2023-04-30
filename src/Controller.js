import axios from "axios";
import {PinataAPI_KEY, PinataAPI_SECRET} from "./Pinata";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {marketaddress, nftaddress} from "./config";
import NFT from "./build/contracts/NFT.json";
import Marketplace from "./build/contracts/Marketplace.json";

// send file to pinata
export const sendFileToIPFS = async (imageFile) => {

    if (imageFile) {
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            const resFile = await axios({
                method: "post", url: "https://api.pinata.cloud/pinning/pinFileToIPFS", data: formData, headers: {
                    'pinata_api_key': `${PinataAPI_KEY}`,
                    'pinata_secret_api_key': `${PinataAPI_SECRET}`,
                    "Content-Type": "multipart/form-data",
                }
            })

            console.log("resFile: ", resFile)

            const ImgHash = resFile.data.IpfsHash; // This is the hash of the image
            // console.log(ImgHash);
            //Take a look at your Pinata Pinned section, you will see a new imageFile added to you list.
            return 'https://gateway.pinata.cloud/ipfs/' + ImgHash; // This is the URL of the image
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser
                // and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            return "";
        }
    }
}

// create nft
export const createNFT = async (url, title, description, price) => {
    // create the items and list them on the marketplace
    // connect to metamask
    const web3Modal = new Web3Modal({
        network: 'http://127.0.0.1:7545'
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = await provider.getSigner()


    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.mintToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    console.log(tx)
    let tokenId = value.toNumber()
    const price_value = ethers.utils.parseUnits(price, 'ether') // this is the price of the item
    // ethers.utils.parseUnits('1.0', 'ether') equals 1.0 ether which is 1000000000000000000 wei
    // wei is the smallest unit of ether

    // list the item for sale on the marketplace
    // ethers is a library that helps us interact with the blockchain
    contract = new ethers.Contract(marketaddress, Marketplace.abi, signer) // this is the marketplace contract
    let main_price = await contract.getListingPrice()  // this is the listing price + the price of the item

    transaction = await contract.createMarketItem(1, nftaddress, tokenId, price_value, title, description, true, {
        value: main_price
    }) // function in the marketplace contract
    await transaction.wait()
    console.log("Item created successfully")
    console.log(transaction)
}

// getAllNFTs
export const getAllNFTs = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    let nftContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    let marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer)

    const data = await marketContract.getAllItems()
    return await Promise.all(data.map(async (item) => {
        return ({
            itemId: item.itemId.toNumber(),
            price: ethers.utils.formatUnits(item.price.toString(), "ether"),
            image: await nftContract.tokenURI(item.tokenId),
            nftContract: item.nftContract,
            name: item.name,
            creator: item.creator,
            owner: item._owner,
            forSale: item.forSale,
            description: item.description
        })
    }));


}

export const getMyNFTs = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer);

    const data = await marketContract.getMyNFTs();
    return await Promise.all(data.map(async (item) => {
        return ({
            itemId: item.itemId.toNumber(),
            price: ethers.utils.formatUnits(item.price.toString(), "ether"),
            image: await nftContract.tokenURI(item.tokenId),
            nftContract: item.nftContract,
            name: item.name,
            creator: item.creator,
            owner: item._owner,
            forSale: item.forSale,
            description: item.description
        })
    }));

}


export const getNFT = async (id) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer);

    let item = await marketContract.getOneItem(id);
    let image = await nftContract.tokenURI(item.tokenId.toNumber());
    return ({
        itemId: item.itemId.toNumber(),
        price: ethers.utils.formatUnits(item.price.toString(), "ether"),
        image: image,
        nftContract: item.nftContract,
        name: item.name,
        creator: item.creator,
        owner: item._owner,
        forSale: item.forSale,
        description: item.description
    })
}

export const buyNFT = async (tokenId, nft_price) => {
    console.log(tokenId)
    console.log(nft_price)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)

    const price = ethers.utils.parseUnits(nft_price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, tokenId, {
        value: price
    })

    await transaction.wait()
    console.log("Item bought successfully")
    console.log(transaction)
}
