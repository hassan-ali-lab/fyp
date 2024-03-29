import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Card from "./components/Card";
import Modal1 from "./Modals/Modal1";
import BidSuccessModal from "./Modals/BidSuccessModal";
import BidPlaceModal from "./Modals/BidPlaceModal";
import {useMetaMask} from "metamask-react";
import Resizer from "react-image-file-resizer";
import {Link, useParams} from "react-router-dom";
import {
    buyNFT,
    closeBidding,
    getNFT,
    isOwner,
    getBidItem,
    closeSale, lastItemID, getBid, convertImage, getAllBidInfo,
} from "./Controller";
import axios from "axios";
import {closeBid} from "./Service";

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
        transform: 'translate(-50%, -50%)', // backgroundColor: 'rgba(0,0,0,0.5)'
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
        transform: 'translate(-50%, -50%)', // backgroundColor: 'rgba(0,0,0,0.5)'
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
  justify-content: flex-start;
  align-items: flex-start;
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


const a1 = process.env.PUBLIC_URL + '/collection-explorer/card1/1.png';
const a2 = process.env.PUBLIC_URL + '/collection-explorer/card1/2.png';
const a3 = process.env.PUBLIC_URL + '/collection-explorer/card1/3.png';
const a4 = process.env.PUBLIC_URL + '/collection-explorer/card1/4.png';
const Items = (cards) => {
    const price = '0.1';
    const title = 'Title';
    const description = 'Description';
    return <ContainerDiv><Div>
        <ChildDiv> <Card image={a1} title={title} description={description}
                         price={price} alt={'preview'}/> </ChildDiv>
        <ChildDiv> <Card image={a2} title={title} description={description}
                         price={price} alt={'preview'}/> </ChildDiv>
        <ChildDiv> <Card image={a3} title={title} description={description}
                         price={price} alt={'preview'}/> </ChildDiv>
        <ChildDiv> <Card image={a4} title={title} description={description}
                         price={price} alt={'preview'}/> </ChildDiv>

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

  :disabled {
    background-color: #be7698;
    border: 1px solid #FE3796;
    color: #FFFFFF;
    cursor: not-allowed;
  }
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


`

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
  //height: 300px;
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
    justify-content: space-between;
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
    const {status, account} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/authentication';
    } else {
        console.log(window.ethereum.selectedAddress);

    }
    const [nft, setNFT] = useState({});
    const [owner, setOwner] = useState(false);
    const params = useParams();
    const [bid, setBid] = useState(null);
    const [nftImage, setNFTImage] = useState(high);
    const [bidLoading, setBidLoading] = useState(false);
    const [bidInfoLoading, setBidInfoLoading] = useState(false);
    const [bidInfos, setBidInfos] = useState(null);
    const [maxBid, setMaxBid] = useState(0);
    const [activeItem, setActiveItem] = useState(false);
    useEffect(() => {
            getNFT(params.id).then((res) => {
                setNFT(res);
                convertImage(res.image, 300, 200).then((res) => {
                    setNFTImage(res);
                });
                setActiveItem(res.forSale);
                getBid(params.id).then((res) => {
                    setBid(res);
                    setMaxBid(Number.parseInt(res.highestBid));
                    if (res.counter > 0) {
                        getAllBidInfo(params.id).then((res) => {
                            setBidInfos(res.reverse());
                            setBidInfoLoading(true);
                            console.log(res);
                        });
                    }
                });
                isOwner(params.id).then((res) => {
                    setOwner(res);
                })
            });
        },
        [params]
    );

    useEffect(() => {
        if (bid) {
            setBidLoading(true);
        }
    }, [bid]);

    const [activeButton, setActiveButton] = useState("all");
    const [parentModelIsOpen, setParentModelIsOpen] = React.useState(false);
    const [childModelIsOpen, setChildModelIsOpen] = React.useState(false);
    console.log("nft:", nft);

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
        getBidItem(params.id).then((res) => {
            console.log("bid:", res);
        })
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
            nft={nft}
            owner={owner}
            maxBid={maxBid}


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
                    <img className={'image'} src={nftImage} alt=""/>

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
                        {nft.itemType === 2 ? <h1>Bidding</h1> : <h1>~{(nft && nft.price ? nft.price : 6.38)}ETH</h1>}
                        <h3>{nft.itemType === 2 ? "" : `(${(nft && nft.price ? nft.price * 1886.44 : "4,334.36")})`}</h3>
                    </div>
                </div>

                <div className={'buttons'}>


                    {nft && nft.itemType === 1 ? (
                            owner ? <PinkButton onClick={() => {
                                    window.location.href = nft.image;

                                }}>
                                    Link
                                </PinkButton> :
                                activeItem ?
                                    <PinkButton onClick={
                                        () => {

                                            buyNFT(nft.itemId, nft.price).then((res) => {
                                                console.log("buy nft: ", res);
                                            })
                                        }
                                    }> Buy Now For {nft && nft.price ? nft.price : 6.38}ETH</PinkButton> :
                                    <PinkButton onClick={
                                        () => {
                                            alert("Item is Sold")
                                        }
                                    }>Item is Sold</PinkButton>)
                        : nft.itemType === 2
                            ? (owner ? <div><PinkButton onClick={() => {
                                console.log("Close Bidding")
                                console.log("nft:", nft)
                                if (nft && nft.itemType === 2) {
                                    closeBidding(nft.itemId).then((res) => {
                                        console.log("close bidding: ", res);
                                        closeBid(nft.itemId).then((res) => {
                                            console.log("close bidding : ", res);
                                        })

                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            }}>
                                Close Bidding
                            </PinkButton>
                                <span>  </span>
                                <span>  </span>
                                <PinkButton onClick={() => {
                                    window.location.href = nft.image;
                                }}>
                                    Link
                                </PinkButton>
                            </div> : activeItem ? <PinkButton
                                onClick={() => {
                                    setParentModelIsOpen(true);
                                }}
                            >Place Bid</PinkButton> : <PinkButton onClick={
                                () => {
                                    alert("Bid is Closed")
                                }
                            }>Bid is Closed</PinkButton>)
                            : ""
                    }
                </div>
            </RightDiv>
        </Container>
        <Container>{nft && nft.itemType === 2 ?
            <ACard>
                <h3 className={'title'}>Offers</h3>
                <div className={'columns'}>
                    <p>Price (ETH)</p>
                    <p>From</p>
                </div>
                {bidLoading ?
                    <div className={'columns'}>
                        <p>{bid.highestBid}</p>
                        <p>{bid.highestBidder.toString().slice(0, 11) + "...." + bid.highestBidder.toString().slice(-3)}</p>
                    </div>
                    : ""}
                {
                    bidInfoLoading && bidLoading && bid.counter > 0 ? bidInfos ? bidInfos.map(
                        (bidInfo, index) => {
                            return <div className={'columns'} key={index}>
                                <p>{bidInfo.highestBid}</p>
                                <p>{bidInfo.highestBidder.toString().slice(0, 11) + "...." + bidInfo.highestBidder.toString().slice(-3)}</p>
                            </div>
                        }
                    ) : "" : ""
                }

            </ACard>
            : <ACard>
                <h3 className={'title'}>History</h3>
                <div className={'columns'}>
                    <p>Price (ETH)</p>
                    <p>From</p>
                </div>
                <div className={'columns'}>
                    <p>6.38</p>
                    <p>0x13ccCb7B1....b52</p>
                </div>
            </ACard>}
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
    </div>)
}

export default NFTDetails;