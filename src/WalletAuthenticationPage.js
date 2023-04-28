import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from 'styled-components';
import {useMetaMask} from "metamask-react";
import LandingPage from "./LandingPage";
import React from "react";

const metamask = process.env.PUBLIC_URL + '/WalletAuthentication/MetaMask_Fox.png';
const coinbase = process.env.PUBLIC_URL + '/WalletAuthentication/CoinBase.png';
const phantom = process.env.PUBLIC_URL + '/WalletAuthentication/Phantom.png';
const trust_wallet = process.env.PUBLIC_URL + '/WalletAuthentication/Trust Wallet.png';
const wallet_connect = process.env.PUBLIC_URL + '/WalletAuthentication/WalletConnect.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //text-align: center;
  align-self: center;
  width: 100%;
  height: 500px;

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 50%;
    height: 70%;
  }

  .image {
    width: 50px;
    margin-bottom: 10px;
  }
`

const Item = styled.button`
  all: unset;
  flex: 0 0 32%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function WalletAuthenticationPage(props) {
    const {status, connect, account} = useMetaMask();

    if (status === "initializing") {
        return <div>Synchronisation with MetaMask ongoing...</div>;
    } else if (status === "unavailable") {
        return <div>MetaMask not available :\</div>;
    } else if (status === "notConnected") {
        return (<div>
            <Header pageTitle={"Wallet Authentication"} linkTree={'Wallet Authentication'}/>
            <Container>
                <div className={'center'}>
                    <Item onClick={connect}>
                        <img className={'image'} src={metamask} alt="metamask"/>
                        <div>Metamask</div>
                    </Item>
                    <Item>
                        <img className={'image'} src={phantom} alt="phantom"/>
                        <div>Phantom</div>
                    </Item>
                    <Item>
                        <img className={'image'} src={trust_wallet} alt="trustwallet"/>
                        <div>Trust Wallet</div>
                    </Item>
                    <Item>
                        <img className={'image'} src={wallet_connect} alt="walletconnect"/>
                        <div>WalletConnect</div>
                    </Item>
                    <Item>
                        <img className={'image'} src={coinbase} alt="coinbase"/>
                        <div>Coinbase</div>
                    </Item>
                </div>
            </Container>
            <Footer/>
        </div>);
    } else if (status === "connecting") {
        return <div>Connecting...</div>;
    } else if (status === "connected") {
        setTimeout(() => {
                window.location.href = "/";
            }
            , 10000);
        return <div>Connected with account {account}</div>;

        // window.location.href = "/";
    } else {
        return <div>Unknown status Hello</div>;
    }


}

export default WalletAuthenticationPage;