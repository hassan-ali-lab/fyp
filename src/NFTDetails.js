import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Card from "./components/Card";
import Modal1 from "./Modals/Modal1";
import BidSuccessModal from "./Modals/BidSuccessModal";
import BidPlaceModal from "./Modals/BidPlaceModal";
import {useMetaMask} from "metamask-react";

const profilePic = process.env.PUBLIC_URL + '/profile-images/profile.png';
// const downarrow = process.env.PUBLIC_URL + '/arrow-down.svg';
const high = process.env.PUBLIC_URL + '/high/image.png'
const eth = process.env.PUBLIC_URL + '/Eth.png'

const customStyles1 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // backgroundColor: 'rgba(0,0,0,0.5)'
        border: '1px solid white',
        borderRadius: '40px',
        height: '400px',
        padding: '0px',
    },
};
const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // backgroundColor: 'rgba(0,0,0,0.5)'
        border: '1px solid white',
        borderRadius: '40px',
        height: '600px',
        padding: '0px',
    },
};

const Container = styled.div`
  width: 100%;
  //position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //padding: 60px;

`
/*
const CircularImage = styled.img`
  position: absolute;
  top: -80px;
  left: 50px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 20px 0;
`*/

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`
const ChildDiv = styled.div`

  flex: 1 1 25%; /* 1 is the flex-grow, 0 is the flex-shrink, and 30% is the flex-basis */
  //margin: 30px;/
  padding: 50px;
  //float:left;

`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Items = (cards) => {
    return <ContainerDiv><Div>
        <ChildDiv> <Card/></ChildDiv>
        <ChildDiv> <Card/></ChildDiv>
        <ChildDiv> <Card/></ChildDiv>
        <ChildDiv> <Card/></ChildDiv>
    </Div>
        <PinkButton>Load More</PinkButton>
    </ContainerDiv>
}

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
/*

const ButtonStrip = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`
const Button = styled.button`
  /!*format remove*!/
  position: relative;
  background-color: #FFFFFF;
  border: none;
  padding: 10px;
  margin: 10px;

  ::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 0;
    border-bottom: 3px solid #FE3796;
  }

  //border: 1px solid #000000;
  :hover {
    color: #FE3796;

    ::before {
      width: 50%;
      transition: linear 0.3s;
    }
  }

`*/

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 50px;
  width: 100%;

  //.row {
  //  display: flex;
  //  flex-direction: row;
  //  //justify-content: space-around;
  //  align-items: center;
  //  //width: 100%;
  //  text-align: center;
  //}
`
/*

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  border: 1px solid #cccaca;
  padding: 10px;
  margin-top: 10px;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
  }


  .body-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 10px;
    flex-wrap: wrap;

    > div {
      margin: 10px;
      padding: 10px;
    }
  }

  .body-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 10px;
    flex-wrap: wrap;

    .rec {
      padding: 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .label {
        //font-weight: bold;
        border: 1px solid deeppink;
        padding: 3px;
        border-radius: 50%;
        background-color: deeppink;
        color: white;
      }
    }

    > div {
      margin: 10px;
      padding: 10px;
    }
  }
`
*/


const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding-top: 50px;
  //height: 900px;

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin-top: 30px;

    > button {
      margin: 10px 20px 0 10px;
    }
  ;
  }

  .title {
    font-size: 32px;
    margin: 30px 0;
  }

  .detail {
    margin: 5px 0 20px 0;
  }

  .row {
    display: flex;
    flex-direction: row;


    img {
      width: 50px;
      margin: 5px 10px 5px 0;
    }

    .profile {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      > div {
        margin: 10px 30px 10px 0;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
    }


  }

  .price_div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 30px 30px 30px 0;

    > p {
      margin: 15px 0;

    }

    > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-end;

    }
  }

  .items {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 10px;
    flex-wrap: wrap;
    //margin: 10em;

    > div {
      margin: 10px 30px;
    }
  }

`

const ACard = styled.div`
  border: 1px solid #706b6b;
  border-radius: 15px;
  width: 90%;
  margin: 50px 25px;
  //height: 100px;
  padding: 30px;
  //text-align: center;
  .title {
    //font-size: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .title-item {
      padding: 0 10px;
    }
  }

  .paragraphs {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 0;

    > p {
      margin: 10px 0;
    }
  }

  .table {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;

    > div {
      margin: 10px 0;

      > div {
        margin: 10px 20px 10px 0;
      }
    }

  }

  > div {
    width: 100%;
    //padding: 10px 0;
  }

  .element {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    border-bottom: 1px solid #706b6b;
    //padding-left: 5px;
    > img {
      //width: 50px;
      margin: 0 10px 0 0;
      width: 12px;
    }
  }

  .columns {
    display: flex;
    flex-direction: row;
    //justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    > div {
      width: 100%;
    }

  }


`

const ImageCard = styled.div`


  width: 500px;
  height: 700px;
  //margin: 50px;
  border: 1px solid transparent;
  border-radius: 25px;
  background-color: transparent;

  .image {
    width: 100%;
    height: 100%;

    border: 1px solid transparent;
    border-radius: 25px;
  }
`

function NFTDetails(props) {
    const {status} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/wallet-authentication';
    }
    const [activeButton, setActiveButton] = useState("all");


    // const [name, setName] = useState("John Doe");
    // const [account, setAccount] = useState("0x13ccCb7B1b524c73486b7EC58dDA0Fa5A0763FAd")
    const [parentModelIsOpen, setParentModelIsOpen] = React.useState(false);
    const [childModelIsOpen, setChildModelIsOpen] = React.useState(false);
    const buttons = {
        'all': document.getElementById('all'),
        'sports': document.getElementById('sports'),
        'music': document.getElementById('music'),
        'arts': document.getElementById('arts'),
        'collectibles': document.getElementById('collectibles'),
        'trending_cards': document.getElementById('trending_cards'),
        'utilities': document.getElementById('utilities'),
        'photography': document.getElementById('photography'),
    }
    const openChildModel = () => {
        setChildModelIsOpen(true);
    }
    useEffect(() => {
        // loop all buttons
        for (const [key, value] of Object.entries(buttons)) {
            // if the button is the active button, set the color to pink
            if (key === activeButton) {
                if (value !== null) {
                    value.style.color = "white";
                    value.style.background = "#FE3796";
                }
            } else {
                if (value !== null) {
                    // otherwise, set the color to black
                    value.style.color = "black";
                    value.style.background = "white";
                }
            }
        }
    })


    function afterParentOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeParentModal() {
        setParentModelIsOpen(false);
    }

    function afterChildOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeChildModal() {
        setChildModelIsOpen(false);
    }

    return (<div>
            <Header pageTitle={"Explore NFTs"} linkTree={"explore"} profilePic={profilePic}/>
            <BidPlaceModal
                isOpen={parentModelIsOpen}
                onAfterOpen={afterParentOpenModal}
                onRequestClose={closeParentModal}
                style={customStyles2}
                openChildModal={openChildModel}
            />
            <BidSuccessModal

                isOpen={childModelIsOpen}
                onAfterOpen={afterChildOpenModal}
                onRequestClose={closeChildModal}
                style={customStyles1}
            />
            <Container>
                <LeftDiv>
                    <ImageCard>
                        <img className={'image'} src={high} alt=""/>
                    </ImageCard>
                </LeftDiv>
                <RightDiv>
                    <p>by Billionaire's NFT Club </p>
                    <h1 className={'title'}>Golden Skull</h1>
                    <p className={'detail'}>The Wall Street Official Avatar Fight Club is launching its an NFT<br/>
                        Collection of over 50k unique pieces from the Wall Street... Read more</p>
                    <div className={'row'}>
                        <div className={'profile'}>
                            <h3>Creator</h3>
                            <div>
                                <img src={profilePic} alt=""/> <b>0x13ccCb7B1....b52</b>
                            </div>
                        </div>
                        <div className={'profile'}>
                            <h3>Current Owner</h3>
                            <div>
                                <img src={profilePic} alt=""/> <b>0x13ccCb7B1....b52</b>
                            </div>
                        </div>
                    </div>
                    <p>Properties</p>
                    <div className={'items'}>
                        <div>Quality: Meteorite</div>
                        <div>Set: Older</div>
                        <div>God: War</div>
                        <div>Mana: 2</div>
                        <div>Rarity: Common</div>
                        <div>Type: Card</div>
                        <div>See more</div>
                    </div>

                    <div className={'price_div'}>
                        <p>Current Price</p>
                        <div>
                            <h1>~6.38ETH</h1><h3>($4,334.36)</h3>
                        </div>
                        <p>Last sale price ~ 5.93ETH</p>
                    </div>
                    <div className={'buttons'}>
                        <PinkButton>Buy Now For 6.38ETH</PinkButton>
                        <PinkButton onClick={
                            () => {
                                setParentModelIsOpen(true)
                            }
                        }>Place a Bid</PinkButton>
                    </div>
                </RightDiv>
            </Container>
            <Container>
                <ACard>
                    <h3 className={'title'}>Offers</h3>
                    <div className={'columns'}>
                        <div>
                            <p>Price (ETH)</p>
                            <h3 className={'element'}><img src={eth} alt={'eth'}/> 0.001 ETH</h3>
                            <h3 className={'element'}><img src={eth} alt={'eth'}/> 0.001 ETH</h3>
                            <h3 className={'element'}><img src={eth} alt={'eth'}/> 0.001 ETH</h3>
                            <h3 className={'element'}><img src={eth} alt={'eth'}/> 0.001 ETH</h3>
                            <h3 className={'element'}><img src={eth} alt={'eth'}/> 0.001 ETH</h3>
                        </div>
                        <div>
                            <p>USD Price</p>
                            <h3 className={'element'}>$384.95</h3>
                            <h3 className={'element'}>$384.95</h3>
                            <h3 className={'element'}>$384.95</h3>
                            <h3 className={'element'}>$384.95</h3>
                            <h3 className={'element'}>$384.95</h3>
                        </div>
                        <div>
                            <p>Floor Difference</p>
                            <h3 className={'element'}>31% Below</h3>
                            <h3 className={'element'}>31% Below</h3>
                            <h3 className={'element'}>31% Below</h3>
                            <h3 className={'element'}>31% Below</h3>
                            <h3 className={'element'}>31% Below</h3>
                        </div>
                        <div>
                            <p>Expiration</p>
                            <h3 className={'element'}>11 min</h3>
                            <h3 className={'element'}>11 min</h3>
                            <h3 className={'element'}>11 min</h3>
                            <h3 className={'element'}>11 min</h3>
                            <h3 className={'element'}>11 min</h3>

                        </div>
                        <div>
                            <p>From</p>
                            <h3 className={'element'}>yes_nft</h3>
                            <h3 className={'element'}>yes_nft</h3>
                            <h3 className={'element'}>yes_nft</h3>
                            <h3 className={'element'}>yes_nft</h3>
                            <h3 className={'element'}>yes_nft</h3>
                        </div>
                    </div>

                </ACard>

                <ACard>
                    <div className={'title'}>
                        <h2 className={'title-item'}>Details</h2>
                        <h2 className={'title-item'}>Bids</h2>
                        <h2 className={'title-item'}>Activity</h2>
                    </div>
                    <div className={'paragraphs'}>
                        <p>A collection of 10,000 undead NFTs minted on the Ethereum blockchain. Each unique Deadfella
                            is randomly generated from a combination of over 400 individually.
                        </p>
                        <p>A collection of 10,000 undead NFTs minted on the Ethereum blockchain. Each unique Deadfella
                            is randomly generated.
                        </p>
                    </div>
                    <div className={'table'}>
                        <div>
                            <div>Blockchain</div>
                            <div>Contract Address</div>
                            <div>Metadata</div>
                            <div>Last Updated</div>
                        </div>
                        <div>
                            <div>Ethereum</div>
                            <div>0x330cd8fec...8b7c</div>
                            <div>Centralized</div>
                            <div>03 days ago</div>
                        </div>
                    </div>

                </ACard>

            </Container>

            <h2>More from this </h2>
            <Items/>

            <Footer/>
        </div>
    )
}

export default NFTDetails;