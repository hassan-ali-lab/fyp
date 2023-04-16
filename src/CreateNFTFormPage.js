import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, {useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Card from "./components/Card";
import axios from "axios";
import {PinataAPI_KEY, PinataAPI_SECRET} from "./Pinata";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {marketaddress, nftaddress} from "./config";
import NFT from './build/contracts/NFT.json';
import Marketplace from './build/contracts/Marketplace.json';
import FileResizer from "react-image-file-resizer";

const eth = process.env.PUBLIC_URL + '/Eth.png';

const Container = styled.form`
  width: 100%;
  height: 1400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  //align-items: center;

  .file_uploader {
    width: 50%;
    height: 1000px !important;
  }
`

const Column = styled.div`
  height: 100%;
  //width: 70%;
  //background-color: #5e2020;
  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 50px 20px;

  p {
    margin: 5px 0;
  }

  .btn-strip {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    font-weight: bold;

    .input {
      width: 100%;
      height: 30px;
      margin: 20px;


      //padding: 0 10px;
    }
  }

  .btn-strip-col {
    display: flex;
    flex-direction: row;
    width: 100%;
    //padding: 5px ;
    .col > .btn-strip {
      padding: 10px;

    }

  }
`
const Dropper = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;

  label {
    width: 100%;
    height: 100%;
    border-radius: 20px;


  }
`


const Button = styled.button`
  background-color: #FE3796;
  border: 1px solid #FE3796;
  border-radius: 100px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 50px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;

  :active {
    background-color: transparent;
    color: #ab698a;
    border-color: #9f6985;
    transform: scale(.96);
  }

  :disabled {
    border-color: #DDDDDD;
    color: #DDDDDD;
    cursor: not-allowed;
    opacity: 1;
  }
`

const fileTypes = ["JPG", "PNG"];

function CreateNFTFormPage() {
    const [imageFile, setImageFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
        setImageFile(e.target.result);
        // console.log(e.target.result);
    }

    const sendFileToIPFS = async (e) => {

        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append("file", imageFile);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${PinataAPI_KEY}`,
                        'pinata_secret_api_key': `${PinataAPI_SECRET}`,
                        "Content-Type": "multipart/form-data",
                    },
                    // axios metadata

                    keyvalues: {
                        "name": title,
                        "description": description,
                        "price": price
                    }
                })

                console.log("resFile: ", resFile)

                const ImgHash = resFile.data.IpfsHash; // This is the hash of the image
                // console.log(ImgHash);
                //Take a look at your Pinata Pinned section, you will see a new imageFile added to you list.
                await createNFT('https://gateway.pinata.cloud/ipfs/' + ImgHash) // This is the URL of the image
                return true;

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
                return false;
            }
        }
    }


    async function createNFT(url) {

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

        // list the item for sale on the marketplace
        // ethers is a library that helps us interact with the blockchain
        contract = new ethers.Contract(marketaddress, Marketplace.abi, signer) // this is the marketplace contract
        let listingPrice = await contract.getListingPrice() // this is the listing price
        listingPrice = listingPrice.toString() // this is the listing price
        console.log(listingPrice)
        transaction = await contract.makeMarketItem(nftaddress, tokenId, price_value, {value: listingPrice}) // function in the marketplace contract
        await transaction.wait()
        console.log('Item created on the marketplace')

    }


    const handleForm = (event) => {
        event.preventDefault()
        if (title === null || description === null || price === null || imageFile === null) {
            alert('Please fill out all fields')
            console.log('Please fill out all fields')
            return
        }
        sendFileToIPFS().then(r => {
                // redirect to home page
                console.log(success)
            }
        ).catch(e => {
            // console.log(e)
            setSuccess(false)
            // console.log(success)
            setPrice(null)
            setTitle(null)
            setDescription(null)
            setImageFile(null)

        })
        // window.location.href = '/'
    }
    return (<div>
        <Header pageTitle={"Create NFT Form"} linkTree={'create nft'}/>
        <Container onSubmit={handleForm}>
            <Column>
                <div><h2>Preview Item</h2><p>Your NFT will look like this </p></div>
                <Card imageFile={imageFile} title={title} description={description} price={price}/>
            </Column>
            <Column>
                {/*change height of imageFile uploader*/}
                <div><h2>Upload file</h2><p>Drag or choose your file to upload</p></div>
                <Dropper>
                    <FileUploader
                        handleChange={(file) => setImageFile(file)}
                        name="e"
                        types={fileTypes}
                        className={'file_uploader'}
                    />
                </Dropper>
                <h2>Select Method*</h2>
                <div className={'btn-strip'}>
                    <div className={''}>Fixed Rate</div>
                    <div>Time Auction</div>
                    <div>Open For Bid</div>
                </div>
                <div className={'btn-strip'}>
                    <label>Title*<br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: Crypto Hunks '}
                               required
                               onChange={e => {
                                   setTitle(e.target.value)
                               }}
                        />
                    </label>
                </div>
                <div className={'btn-strip'}>
                    <label>External Link <br/>
                        <input className={'input'} type="text" name="title"
                               placeholder={'e.g: https://yoursite.io/item/123'}/>
                    </label>
                </div>
                <div className={'btn-strip'}>
                    <label>Description <br/>
                        <input className={'input'} type="text" name="title"
                               placeholder={'e.g: This is a very limited item'}
                               onChange={e =>
                                   setDescription(e.target.value)
                               }
                        />
                    </label>
                </div>

                <div className={'btn-strip-col'}>
                    <div className={'col'}>
                        <div className={'btn-strip'}>
                            <label>Fixed Price*<br/>
                                <input className={'input'} type="text" name="title"
                                       placeholder={'0'}
                                       onChange={e => {
                                           setPrice(e.target.value)
                                       }}

                                />
                            </label>
                        </div>
                        <div className={'btn-strip'}>
                            <label>Royalties<br/>
                                <input className={'input'} type="text" name="title"
                                       placeholder={'Maximum is 70%'}/>
                            </label>
                        </div>
                    </div>
                    <div className={'col'}>
                        <div className={'btn-strip'}>
                            <label>Size (Optional) <br/>
                                <input className={'input'} type="text" name="title"
                                       placeholder={'e.g: Width x height'}/>
                            </label>
                        </div>
                        <div className={'btn-strip'}>
                            <label>Supply <br/>
                                <input className={'input'} type="text" name="title"
                                       placeholder={'1'}/>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={'btn-strip'}>

                    <label>Collection* <br/> <p className={'p'}>This is the collection where your item will appear. </p>
                        <input className={'input'} type="text" name="title"
                               placeholder={'e.g: https://yoursite.io/item/123'}/>
                    </label>
                </div>
                <div>
                    <h3>Explicit and sensitive content</h3>
                    <p>Set this item as explicit and sensitive content</p>
                </div>
                <div>
                    <h3>Unlock once purchased</h3>
                    <p>Include unlockable content that can only be revealed by the owner of the item.</p>
                </div>

                <div style={{padding: '5px'}}>
                    <h3 style={{margin: '10px 0'}}>Blockchain*</h3>
                    <img style={{margin: '10px'}} src={eth} alt="eth" height={'20'}/>Ethereum
                </div>
                <Button className={'btn'} type={'submit'}>Submit</Button>

            </Column>
        </Container>
        <Footer/>
    </div>)
}

export default CreateNFTFormPage;