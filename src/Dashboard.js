import Web3Modal from 'web3modal'
import { nftaddress, marketaddress, PinataAPI_KEY, PinataAPI_SECRET } from './configuration'
import "./App.css";
import { ethers } from "ethers";
import NFT from "./build/contracts/NFT.json";
import Marketplace from "./build/contracts/Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
import MyCard from './MyCard'
import MyNavBar from './MyNavBar';
function Dashboard() {
  const [nfts, setNFts] = useState([]);
  const [loadingState, setloadingState] = useState('not-loadedd')

  async function buyNFT(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })

    await transaction.wait()
    // loadNFTs()
  }


  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      marketaddress,
      Marketplace.abi,
      provider
    );
    const data = await marketContract.fetchMarketTokens();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        // we want get the token metadata - json
        // const meta = await axios.get(tokenUri);
    
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        
        
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image:tokenUri,
          name: "",
          description: "",
        };
        console.log(item) 
        return item;
      })
    );

    setNFts(items);
    setloadingState('loaded')
  }
  useEffect(() => {
    loadNFTs()
  }, [])
  if (loadingState === 'loaded' && !nfts.length) return (<h1
    className='px-20 py-7 text-4x1'>No NFts in marketplace</h1>)
  return ((
    <div>
      <div>
        <div >
          <div >
            {nfts.map((nft, i) => (
              
              <MyCard image={nft.image}  key={i} title={nft.name} description={nft.description} price={nft.price} mint={() => buyNFT(nft)}/>
             
            ))}
          </div>
        </div>
      </div>
    </div>
  ));
}

export default Dashboard;