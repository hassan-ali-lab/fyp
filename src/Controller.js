import axios from "axios";
import {PinataAPI_KEY, PinataAPI_SECRET} from "./Pinata";
import Web3Modal from "web3modal";
import {BigNumber, ethers, Wallet} from "ethers";
import {marketaddress, nftaddress} from "./config";
import NFT from "./build/contracts/NFT.json";
import Marketplace from "./build/contracts/Marketplace.json";
import web3 from "web3";
import Resizer from "react-image-file-resizer";

// send file to pinata
export const sendFileToIPFS = async (imageFile, setImageData) => {

    if (imageFile) {
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            axios({
                method: "post", url: "https://api.pinata.cloud/pinning/pinFileToIPFS", data: formData, headers: {
                    'pinata_api_key': `${PinataAPI_KEY}`,
                    'pinata_secret_api_key': `${PinataAPI_SECRET}`,
                    "Content-Type": "multipart/form-data",
                }
            }).then((resFile) => {
                    console.log(resFile)
                    setImageData('https://gateway.pinata.cloud/ipfs/' + resFile.data.IpfsHash)

                }
            )
        } catch (error) {
            if (error.response) {
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
        }
    }
}

// create nft
export const createMarketItem = async (itemType, url, title, description, time, price) => {
    console.log("itemType, url, title, description, time, price")
    console.log(itemType, url, title, description, time, price)

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()


    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.mintToken(url)
    let tx = await transaction.wait()
    console.log(tx)
    let event = tx.events[0]
    let value = event.args[2]
    console.log(tx)
    let tokenId = value.toNumber()
    let price_value = BigNumber.from(0)
    if (price !== "0") {
        price_value = ethers.utils.parseUnits(price, 'ether') // this is the price of the item
    }
    // ethers.utils.parseUnits('1.0', 'ether') equals 1.0 ether which is 1000000000000000000 wei
    // wei is the smallest unit of ether

    // list the item for sale on the marketplace
    // ethers is a library that helps us interact with the blockchain
    contract = new ethers.Contract(marketaddress, Marketplace.abi, signer) // this is the marketplace contract
    let main_price = await contract.getListingPrice()  // this is the listing price + the price of the item
    time = BigNumber.from(time)

    transaction = await contract.createMarketItem(itemType, nftaddress, tokenId, price_value, title, description, time, true, {
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

    const data = await marketContract.getMarketItems()
    return await Promise.all(data.map(async (item) => {
        return ({
            itemType: item.itemType.toNumber(),
            itemId: item.itemId.toNumber(),
            nftContract: item.nftContract,
            image: await nftContract.tokenURI(item.tokenId), // tokenId
            name: item.name,
            description: item.description,
            creator: item.creator,
            owner: item._owner,
            price: ethers.utils.formatUnits(item.price.toString(), "ether"),
            forSale: item.forSale,
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
            itemType: item.itemType.toNumber(),
            itemId: item.itemId.toNumber(),
            nftContract: item.nftContract,
            image: await nftContract.tokenURI(item.tokenId), // tokenId
            name: item.name,
            description: item.description,
            creator: item.creator,
            owner: item._owner,
            price: ethers.utils.formatUnits(item.price.toString(), "ether"),
            forSale: item.forSale,
        })
    }));

}
export const lastItemID = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer);
    return await marketContract.countMarketItems();
}
export const getNFT = async (id) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftaddress, NFT.abi, signer);
    const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer);

    let item = await marketContract.getMarketItem(id);
    return ({
        itemType: item.itemType.toNumber(),
        itemId: item.itemId.toNumber(),
        nftContract: item.nftContract,
        image: await nftContract.tokenURI(item.tokenId), // tokenId
        name: item.name,
        description: item.description,
        creator: item.creator,
        owner: item._owner,
        price: ethers.utils.formatUnits(item.price.toString(), "ether"),
        forSale: item.forSale,
    })
}

export const getBid = async (id) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer);
    let item = await marketContract.getBidItem(id);
    // convert to ethers item.highestBid
    const highestBid = ethers.utils.formatUnits(item.highestBid.toString(), "ether")
    return ({
        itemType: item.itemType,
        itemId: item.itemId,
        highestBidder: item.highestBidder,
        highestBid: highestBid,
        counter: item.counter,
        closed: item.closed,
        completed: item.completed
    })
}

export const getBidItem = async (itemId) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer);
    return await marketContract.getBidItem(itemId);

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


export const createBid = async (itemType, itemId, bid_price) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
    const price = ethers.utils.parseUnits(bid_price, 'ether')
    const transaction = await contract.placeBid(itemType, itemId, {
        value: price
    })

    await transaction.wait()
    console.log("successfully")
}


export const isOwner = async (itemId) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
    const number = BigNumber.from(itemId)
    return (await contract.isOwner(number))
}
export const isCloseBidding = async (itemId) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
    console.log('------', itemId)
    const number = BigNumber.from(`${itemId}`)

    return (await contract.isClosed(number))
}

export const closeBidding = async (itemId) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
    const transaction = await contract.closeBidding(itemId)
    await transaction.wait()
    console.log("successfully")
}

export const closeSale = async (itemType, itemId) => {
    await axios.post('http://127.0.0.1:3003/', {
            itemType: itemType,
            itemId: itemId
        }
    )
}
export const convertImage = async (image, maxHeight, maxWidth) => {
    const res = await axios.get(image, {responseType: 'arraybuffer'})
    let blob = new Blob([res.data], {type: 'image/png'});
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                maxWidth,
                maxHeight,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    return resizeFile(blob)
}
export const getAllBidInfo = async (itemId) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
    const arrayOfBidInfo = await contract.getAllBidInfo(itemId)
    const tempArray = []
    for (let i = 0; i < arrayOfBidInfo.length; i++) {
        tempArray.push({
            highestBidder: arrayOfBidInfo[i].highestBidder.toString(),
            highestBid: ethers.utils.formatUnits(arrayOfBidInfo[i].highestBid.toString(), "ether"),
        })
    }
    return tempArray
}

