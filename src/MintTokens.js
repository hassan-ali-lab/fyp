import {ethers} from 'ethers'
import {useState} from 'react'
import Web3Modal from 'web3modal'
import {nftaddress, marketaddress} from './config'
import {PinataAPI_KEY, PinataAPI_SECRET} from './Pinata'
import NFT from './build/contracts/NFT.json'
import Marketplace from './build/contracts/Marketplace.json'
import axios from 'axios';

export default function MintTokens() {


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
                        onChange={e => updateFormInput({...formInput, name: e.target.value})}
                    />
                    <br/>
                    <textarea
                        placeholder='Asset Description'
                        className='mt-2 border rounded p-4'
                        onChange={e => updateFormInput({...formInput, description: e.target.value})}
                    />
                    <br/>
                    <input
                        placeholder='Asset Price in Eth'
                        className='mt-2 border rounded p-4'
                        onChange={e => updateFormInput({...formInput, price: e.target.value})}
                    />


                    <br/>
                    <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required/>
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