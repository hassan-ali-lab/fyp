import {ethers} from "ethers";
import {marketaddress, nftaddress} from "../config";
import NFT from "../build/contracts/NFT.json";
import Marketplace from "../build/contracts/Marketplace.json";
import {useState} from "react";


// fetchMyNFTs

function F() {
    const [listingPrice, setListingPrice] = useState(0);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const [countMarketItems, setCountMarketItems] = useState(0);

    async function loadMyNFTs() {
        // localhost:7545

        const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(
            marketaddress,
            Marketplace.abi,
            provider
        );

        let listingPrice = await marketContract.getListingPrice() // this is the listing price
        listingPrice = listingPrice.toString()
        // setListingPrice(listingPrice); // in wei
        // convert to ether
        listingPrice = ethers.utils.formatUnits(listingPrice, 'ether');
        setListingPrice(listingPrice);
        const countMarketItems = await marketContract.countMarketItems();
        //convert big number to number
        console.log(countMarketItems.toNumber());
        console.log(countMarketItems)
        setCountMarketItems(countMarketItems.toNumber());
        // getOneItem
        for (let i = 0; i < countMarketItems.toNumber(); i++) {
            const oneItem = await marketContract.getOneItem(i);
            console.log(oneItem);
        }
        // getAllMyIds()
        const allMyIds = await marketContract.getAllMyIds()
        console.log('ids', allMyIds);
        setLoadingState('loaded');
        //CountMyItems
        const countMyItems = await marketContract
        console.log('count :', countMyItems);
    }

    return <div>
        <form onSubmit={
            (event) => {
                event.preventDefault();
                loadMyNFTs().then(r => console.log('success')).catch(e => console.log(e))
            }
        }>
            <h1>Information</h1>
            {loadingState === 'loaded' && <p>Loaded</p>}
            <p>Listing Price: {listingPrice}</p>
            <p>Number of Market Items: {countMarketItems}</p>


            <button onClick={loadMyNFTs}>Load Information
            </button>
        </form>
    </div>
        ;
}

export default F;