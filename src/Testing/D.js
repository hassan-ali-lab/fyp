import {ethers} from "ethers";
import {marketaddress, nftaddress} from "../config";
import NFT from "../build/contracts/NFT.json";
import Marketplace from "../build/contracts/Marketplace.json";
import {useState} from "react";


// fetchMyNFTs

function D() {
    const listItems = [];
    const [nfts, setNFts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');

    async function loadMyNFTs() {
        // localhost:7545

        const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(
            marketaddress,
            Marketplace.abi,
            provider
        );

        const data = await marketContract.getMyNFTs();

        setNFts(await Promise.all(
            data.map(async (i) => {
                const tokenUri = await tokenContract.tokenURI(i.tokenId);
                let price = ethers.utils.formatUnits(i.price.toString(), "ether");
                let token = i.tokenId.toNumber();
                console.log(i.creator)
                let creator = i.creator;
                let owner = i.owner;
                let image = tokenUri;
                let name = i.name;
                let description = i.description;
                let forSale = i.forSale;
                console.log(i.forSale);
                setLoadingState('loaded');
                return ({
                    price,
                    token,
                    creator,
                    owner,
                    image,
                    name,
                    description,
                    forSale
                })
            })
        ));
    }

    return <div>
        <form onSubmit={
            (event) => {
                event.preventDefault();
                loadMyNFTs().then(r => console.log('success')).catch(e => console.log(e))
            }
        }>
            <h1>My NFTs</h1>
            {nfts.length > 0 && <p>Here are your NFTs</p>}
            {nfts.length === 0 && <p>You don't have any NFTs</p>}
            {loadingState}
            <div>
                {nfts.map((nft, i) => (
                    <div key={i}>
                        <p>tokenID - {nft.token}</p>
                        <p>image - {nft.image}</p>
                        <p>Price - {nft.price} Eth</p>
                        <p>creator - {nft.creator}</p>
                        <p>Owner - {nft.owner}</p>
                        <p>Name - {nft.name}</p>
                        <p>Description - {nft.description}</p>
                        <p>isForSale - {nft.forSale?'true':'false'}</p>
                    </div>))
                }
            </div>
            <button onClick={loadMyNFTs}>Load My NFTs
            </button>
        </form>
    </div>
        ;
}

export default D;