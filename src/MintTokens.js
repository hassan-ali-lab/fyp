
import { ethers } from 'ethers'
import { useState } from 'react'
import Web3Modal from 'web3modal'
import { nftaddress, marketaddress, PinataAPI_KEY, PinataAPI_SECRET } from './configuration'
import NFT from './build/contracts/NFT.json'
import Marketplace from './build/contracts/Marketplace.json'
import axios from 'axios';

export default function MintTokens() {
    const [fileImg, setFileImg] = useState(null);
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const sendFileToIPFS = async (e) => {

        if (fileImg) {
            try {

                const formData = new FormData();
                formData.append("file", fileImg);
                formData.append("keyvalues",{
                        "name": formInput.name,
                        "description": formInput.description
                    });

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${PinataAPI_KEY}`,
                        'pinata_secret_api_key': `${PinataAPI_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                    keyvalues: {
                        "name": formInput.name,
                        "description": formInput.description
                    }
                });

                const ImgHash = resFile.data.IpfsHash;
                // console.log(ImgHash);
                //Take a look at your Pinata Pinned section, you will see a new file added to you list.   
                createSale('https://gateway.pinata.cloud/ipfs/' + ImgHash)


            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }





    async function createSale(url) {

        // create the items and list them on the marketplace
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        // we want to create the token
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.mintToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        // list the item for sale on the marketplace 
        contract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.makeMarketItem(nftaddress, tokenId, price, { value: listingPrice })
        await transaction.wait()
    }

    return <>
        <div>
            <form onSubmit={(event) => {
                event.preventDefault()
                sendFileToIPFS()
            }}>
                <div className='w-1/2 flex flex-col pb-12'>
                    <input
                        placeholder='Asset Name'
                        className='mt-8 border rounded p-4'
                        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                    <br />
                    <textarea
                        placeholder='Asset Description'
                        className='mt-2 border rounded p-4'
                        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                    <br />
                    <input
                        placeholder='Asset Price in Eth'
                        className='mt-2 border rounded p-4'
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />


                    <br />
                    <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
                    <button //onClick={createMarket}
                        className='font-bold mt-4 bg-purple-500 text-white rounded p-4 shadow-lg'
                    >
                        Mint NFT
                    </button>

                </div>

            </form>

        </div>
    </>

}