import styled from "styled-components";
import Button from "../components/Button";
import Modal from "react-modal";
import BidSuccessModal from "./BidSuccessModal";
import React, {useEffect} from "react";
import {closeBidding, createBid, isCloseBidding, isOwner} from "../Controller";
import axios from "axios";
import {Router} from "react-router-dom";

Modal.setAppElement('#root');

const eth = process.env.PUBLIC_URL + '/Eth.png';
const green_tick_url = process.env.PUBLIC_URL + '/modal-images/green-tick.svg';
const facebook_url = process.env.PUBLIC_URL + '/modal-images/facebook.svg';
const instagram_url = process.env.PUBLIC_URL + '/modal-images/instagram.svg';
const twitter_url = process.env.PUBLIC_URL + '/modal-images/twitter.svg';
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 100%;
  color: black;
  border: 1px solid white;
  padding: 20px;

  .table {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 5px;

    > div {
      display: flex;
      flex-direction: column;
      //justify-content: flex-start;
      //align-items: flex-start;
      //width: 100%;
      //margin: 20px;
      > div {
        margin: 10px 0;
      }
    }
  }

  .placeholder_title {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
  }

  .search {
    width: 100%;
    padding: 10px;
    border: 1px solid #a29f9f;
  }

  .metamask {
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > div:first-child {

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      > div {
        padding: 20px;
      }
    }
  }

  .text {
    width: 100%;
    padding: 20px;
  }

  .btn {
    width: 100%;
    margin-top: 30px;
  }
`


function BidPlaceModal(props) {
    const {nft, owner} = props;
    const [isClosed, setIsClosed] = React.useState(false);
    const [bidAmount, setBidAmount] = React.useState("0")
    const [maxBid, setMaxBid] = React.useState(0)
    useEffect(() => {
        setMaxBid(props.maxBid)
        if (nft) {
            console.log('----', nft)
            if (nft.itemType && nft.itemId)
                isCloseBidding(nft.itemType, nft.itemId).then((res) => {
                    console.log(res)
                    setIsClosed(res)
                })
        }
    }, [nft])
    return (<Modal     {...props}>

            <Card>
                <img src={green_tick_url} alt="" height={'80'}/>
                <h2>Place a Bid</h2>
                <div className={'text'}>
                    You are about to place a bid for yes_ NFT Club <br/> Collection.
                </div>

                <div className={'metamask'}>
                    <div>
                        <img src={eth} alt=""/>
                        <div>
                            <p>0x330cd8fec...8b7c</p>
                            <div>Connected</div>
                        </div>
                    </div>
                    <div>
                        <p>Metamask</p>
                        <div>change</div>
                    </div>
                </div>
                <div className={'placeholder_title'}>Enter bid amount</div>
                <input className={'search'} type="number" placeholder={`Minimum bid ${maxBid} ETH`} onChange={
                    (e) => {
                        setBidAmount(e.target.value)
                    }
                }/>

                <div className={'table'}>
                    <div>
                        <div>Gas fee</div>
                        <div>Marketplace fee</div>
                        <div>Total bid amount</div>
                    </div>
                    <div>
                        <div>~0.01 ETH</div>
                        <div>Free</div>
                        <h1>{bidAmount ? bidAmount : "0"} ETH</h1>
                    </div>
                </div>
                <div className={'btn'}>
                    {owner ? (isClosed ? "Close" : <Button primary width={'100%'} onClick={() => {
                        // window.location.href = '/user-profile'
                        closeBidding(nft.itemType, nft.itemId, bidAmount).then((res) => {
                            console.log(res)
                            axios.get(`http://localhost:3003/auction/${nft.itemId}`).then((res) => {
                                console.log(res)
                            });
                            props.onRequestClose()
                        }).catch((err) => {
                            console.log(err)
                        })
                    }} name={'Close Bidding'}/>) : <Button primary width={'100%'} onClick={() => {
                        // window.location.href = '/user-profile'
                        if (bidAmount < maxBid) {
                            alert(`Bid amount must be greater than ${maxBid} ETH`)
                            return;
                        }
                        console.log(nft.itemType, nft.itemId, bidAmount)
                        createBid(nft.itemType, nft.itemId, bidAmount).then((res) => {
                            console.log(res)
                            window.location.reload();
                            props.onRequestClose()
                            props.openChildModal();
                        }).catch((err) => {
                            console.log(err)
                        })
                    }} name={'Place a bid'}/>}

                </div>

            </Card>
        </Modal>
    );
}

export default BidPlaceModal;