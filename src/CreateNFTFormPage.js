import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Card from "./components/Card";
import {sendFileToIPFS, createNFT} from "./Controller"
import {useMetaMask} from "metamask-react";

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

    .active {
      background-color: #FE3796;
      color: white;
      border-radius: 20px;
      padding: 5px 10px;
    }

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

const fileTypes = ["JPG", "PNG", "image/png", "image/jpeg"];

function CreateNFTFormPage() {
    const {status} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/authentication';

    }
    const [imageFile, setImageFile] = useState(null);
    // const [success, setSuccess] = useState(false);
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    // const fileReader = new FileReader();
    const [option, setOption] = useState('fixed price');
    const [itemType, setItemType] = useState(1);

    // fileReader.onloadend = (e) => {
    //
    //     setImageFile(e.target.result);
    //     console.log(e.target.result)
    // }


    const handleForm = (event) => {
        event.preventDefault()
        if (title === null || description === null || price === null || imageFile === null) {
            alert('Please fill out all fields')
            console.log('Please fill out all fields')
            return
        }

        sendFileToIPFS(imageFile).then(url => {
            switch (option) {
                case 'fixed price':
                    console.log(url, title, description, price)

                    createNFT(url, title, description, price).then((v) => {
                        console.log(v)
                    }).catch(e => {
                    })
                    break;
                case 'time auction':
                    break;
                case 'open for bids':
                    break;
                default:
            }

        }).catch(e => {
            console.log(e)
        })
    }


    return (<div>
        <Header pageTitle={"Create NFT Form"} linkTree={'create nft'}/>
        <Container onSubmit={handleForm}>
            <Column>
                <div><h2>Preview Item</h2><p>Your NFT will look like this </p></div>
                {imageFile ? <Card image={URL.createObjectURL(imageFile)} title={title} description={description}
                                   price={price} alt={'preview'}/> : ""}
            </Column>
            <Column>
                {/*change height of imageFile uploader*/}
                <div><h2>Upload file</h2><p>Drag or choose your file to upload</p></div>
                <Dropper>
                    <FileUploader
                        handleChange={(file) => {
                            console.log(file)
                            // fileReader.readAsDataURL(file)
                            setImageFile(file)
                        }}
                        name="e"
                        types={fileTypes}
                        className={'file_uploader'}
                    />
                </Dropper>
                <h2>Select Method*</h2>
                <div className={'btn-strip'}>
                    <div id={'fixed-price '} className={'fixed-price active'} onClick={() => {
                        document.getElementsByClassName('fixed-price')[0].classList.add('active');
                        document.getElementsByClassName('time-auction')[0].classList.remove('active');
                        document.getElementsByClassName('open-for-bids')[0].classList.remove('active');
                        document.getElementsByClassName('option')[0].style.display = 'inherit';
                        setOption('fixed price');
                        setItemType(1);
                        console.log(itemType)
                    }}>Fixed Rate
                    </div>
                    <div id={'time-auction'} className={'time-auction'} onClick={() => {
                        document.getElementsByClassName('fixed-price')[0].classList.remove('active');
                        document.getElementsByClassName('time-auction')[0].classList.add('active');
                        document.getElementsByClassName('open-for-bids')[0].classList.remove('active');
                        // display options are block,inline, inline-block,
                        document.getElementsByClassName('option')[0].style.display = 'inherit';
                        setOption('time auction');
                        setItemType(3);
                        console.log(itemType)
                    }}>Time Auction
                    </div>
                    <div id={'open-for-bids'} className={'open-for-bids'}
                         onClick={() => {
                             document.getElementsByClassName('fixed-price')[0].classList.remove('active');
                             document.getElementsByClassName('time-auction')[0].classList.remove('active');
                             document.getElementsByClassName('open-for-bids')[0].classList.add('active');
                             // remove option element
                             document.getElementsByClassName('option')[0].style.display = 'none';
                             setOption('open for bids');
                             setItemType(2);
                             console.log(itemType)
                         }}
                    >Open For Bid
                    </div>
                </div>
                <div className={'btn-strip'}>
                    <label>Title*<br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: Crypto Hunks '}
                               onChange={e => {
                                   setTitle(e.target.value)
                               }}
                        />
                    </label>
                </div>
                <div className={'btn-strip'}>
                    <label>Description <br/>
                        <input className={'input'} type="text" name="title"
                               placeholder={'e.g: This is a very limited item'}
                               onChange={e => {
                                   setDescription(e.target.value);
                               }}
                        />
                    </label>
                </div>
                <div className={'btn-strip option'}>
                    <label>{option}<br/>
                        <input className={'input'} type="number" name="title"
                               placeholder={'0'}
                               onChange={e => {
                                   setPrice(e.target.value)
                               }}

                        />
                    </label>
                </div>
                <div className={'btn-strip-col'}>
                    <div className={'col'}>


                        <div className={'btn-strip'}>
                            <label>External Link <br/>
                                <input className={'input'} type="text" name="title"
                                       placeholder={'e.g: https://yoursite.io/item/123'}/>
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