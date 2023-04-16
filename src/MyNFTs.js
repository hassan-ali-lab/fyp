import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {nftaddress, marketaddress} from './config'
import NFT from './build/contracts/NFT.json'
import Marketplace from './build/contracts/Marketplace.json'
import axios from 'axios';
import MyCard from './MyCard'


export default function MyNFTs() {
    // array of nfts
    const [nfts, setNFts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        // what we want to load:
        // we want to get the msg.sender hook up to the signer to display the owner nfts

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
        const data = await marketContract.fetchMyNFTs()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            // we want get the token metadata - json
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: tokenUri,
                name: i.name,
                description: i.description
            }
            return item
        }))

        setNFts(items)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !nfts.length) return (<h1
        className='px-20 py-7 text-4x1'>You do not own any NFTs currently :(</h1>)

    return (
        <div>

            <div className=' '>
                {
                    nfts.map((nft, i) => {
                        return (
                            <MyCard key={i} image={nft.image} title={nft.name} description={nft.description}
                                    price={nft.price}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
 