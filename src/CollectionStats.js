import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from 'styled-components';
import React from "react";
import {useMetaMask} from "metamask-react";

const star = process.env.PUBLIC_URL + '/star.svg';


const PinkButton = styled.button`
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
  margin-bottom: 10px;
  outline: none;
  padding: 10px 40px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;
`

const Container = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  //text-align: center;
  width: 100%;
  padding: 50px;

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 50px 0;

  }

  .star {
    width: 12px;
  }

  .data {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 30px;
    justify-content: space-between;

    > div {
      width: 100%;

      > div {
        width: 100%;
        padding-bottom: 30px;
        border-bottom: 1px solid #e5e5e5;
        padding-top: 30px;
      }

    }

    > div:nth-child(1) {
      width: 20%;
    }

  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e5e5e5;


    .left_div {
      display: flex;
      flex-direction: row;

      > div {
        margin-right: 20px;
      }
    }

    .right_div {
      display: flex;
      flex-direction: row;

      > div {
        margin-right: 20px;
      }
    }
  }
`
const profilePic = process.env.PUBLIC_URL + '/profile-images/profile.png';


function WalletAuthenticationPage(props) {
    const {status} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/wallet-authentication';
    }
    return (<div>
        <Header pageTitle={"Collection Stats"} linkTree={"Stats"} profilePic={profilePic}/>

        <Container>
            <h1>Top Collection</h1>
            <div className={'header'}>
                <div className={'left_div'}>
                    <div>Top</div>
                    <div>Trending</div>
                    <div>Wishlist</div>
                </div>
                <div className={'right_div'}>
                    <div>1h</div>
                    <div>6h</div>
                    <div>24h</div>
                    <div>3d</div>
                    <div>7d</div>
                    <div>1m</div>
                </div>
            </div>

            <div className={'data'}>
                <div>
                    <div>#</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                </div>
                <div>
                    <div>Collection</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                    <div>Trippin’ Ape Tribe</div>
                </div>
                <div>
                    <div>Volume</div>
                    <div>14.32 ETH</div>
                    <div>0.53 ETH</div>
                    <div>25.4 ETH</div>
                    <div>28.5 ETH</div>
                    <div>8.62 ETH</div>
                    <div>2.62 ETH</div>
                    <div>1.12 ETH</div>
                    <div>2.72 ETH</div>
                    <div>4.73 ETH</div>
                    <div>3.85 ETH</div>
                </div>
                <div>
                    <div>Change</div>
                    <div>+2.3%</div>
                    <div>+5.52%</div>
                    <div>+2.46%</div>
                    <div>+6.2%</div>
                    <div>+9.5%</div>
                    <div>+8.3%</div>
                    <div>+7.4%</div>
                    <div>+1.12%</div>
                    <div>+2.2%</div>
                    <div>+7.4%</div>
                </div>
                <div>
                    <div>Floor Price</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>
                    <div>14.32 ETH</div>


                </div>
                <div>
                    <div>Owner</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                    <div>2.4k</div>
                </div>
                <div>
                    <div>Items</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                    <div>205</div>
                </div>
                <div>
                    <div>Watchlist</div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                    <div><img className={'star'} src={star} alt="star"/></div>
                </div>
            </div>
            <div className={'center'}><PinkButton>Place a Bid</PinkButton></div>

        </Container>
        <Footer/>
    </div>);
}

export default WalletAuthenticationPage;