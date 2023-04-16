import styled from "styled-components";
import Button from "../components/Button";
import Modal from "react-modal";
import BidSuccessModal from "./BidSuccessModal";
import React from "react";

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
                <input className={'search'} type="text" placeholder={'Minimum bid 0.4.2 ETH'}/>

                <div className={'table'}>
                    <div>
                        <div>Service fee</div>
                        <div>Marketplace fee, 5%</div>
                        <div>Total bid amount</div>
                    </div>
                    <div>
                        <div>0.1 ETH</div>
                        <div>0.5 ETH</div>
                        <h1>4.12 ETH</h1>
                    </div>
                </div>
                <div className={'btn'}>
                    <Button primary width={'100%'} onClick={() => {
                        // window.location.href = '/user-profile'
                        props.onRequestClose()
                        props.openChildModal();
                    }} name={'Place a bid'}/>
                </div>

            </Card>
        </Modal>
    );
}

export default BidPlaceModal;