import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Card from "./components/Card";
import Modal1 from "./Modals/Modal1";
import Card4 from "./components/Card4";
import {useMetaMask} from "metamask-react";

const profilePic = process.env.PUBLIC_URL + '/profile-images/profile.png';
const downarrow = process.env.PUBLIC_URL + '/arrow-down.svg';
const avitar1 = process.env.PUBLIC_URL + '/avatar1.png';

const customStyles = {
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

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 60px;

`

const CircularImage = styled.img`
  position: absolute;
  top: -80px;
  left: 50px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 20px 0;
`
const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  background: rgb(27, 27, 27);
  color: white;
  /*background: #FE3796;*/
  padding: 20px 10px;
  margin: 30px 15px;
  position: relative;
  width: 260px;
  height: 330px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 10px;
`

const Card2Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  margin: 0;
  background: rgb(27, 27, 27);

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 8px;
  }
`


const Card2Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
`

const Card2LeftDiv = styled.div`
  border-radius: 10px;
  //margin: 10px;
  width: 100%;
  height: 100%;
  background: white;
  //margin: 5px;
  //padding: 10px;
  //  
`
const Card2RightDiv = styled.div`
  display: flex;
  padding: 0px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  //background: white;
  div {
    background: white;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    margin: 2px 2px;
  }
`

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  .card4 {
    width: 100%;
    height: 100%;
  }
`
const ChildDiv = styled.div`

  flex: 1 1 30%; /* 1 is the flex-grow, 0 is the flex-shrink, and 30% is the flex-basis */
  //margin: 30px;/
  padding: 30px;
  //float:left;
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .title {
    align-self: flex-start;
    padding: 15px 20px;
  }
`

const Items = (cards) => {
    return <ContainerDiv>
        <div className={'title'}>Collection Result</div>
        <Div>

            <Card2>
                <Card2Header><img src={avitar1} alt="avitar1"/>
                    <div>
                        <div>Next Future Abstract</div>
                        <div>SpaceX Club</div>
                    </div>
                </Card2Header>
                <Card2Body>
                    <Card2LeftDiv></Card2LeftDiv>
                    <Card2RightDiv>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Card2RightDiv>
                </Card2Body>
            </Card2>
            <Card2>
                <Card2Header><img src={avitar1} alt="avitar1"/>
                    <div>
                        <div>Next Future Abstract</div>
                        <div>SpaceX Club</div>
                    </div>
                </Card2Header>
                <Card2Body>
                    <Card2LeftDiv></Card2LeftDiv>
                    <Card2RightDiv>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Card2RightDiv>
                </Card2Body>
            </Card2>
            <Card2>
                <Card2Header><img src={avitar1} alt="avitar1"/>
                    <div>
                        <div>Next Future Abstract</div>
                        <div>SpaceX Club</div>
                    </div>
                </Card2Header>
                <Card2Body>
                    <Card2LeftDiv></Card2LeftDiv>
                    <Card2RightDiv>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Card2RightDiv>
                </Card2Body>
            </Card2>
        </Div>
        <div className={'title'}>NFT Result</div>
        <Div>
            <ChildDiv> <Card/></ChildDiv>
            <ChildDiv> <Card/></ChildDiv>
            <ChildDiv> <Card/></ChildDiv>

            <ChildDiv> <Card/></ChildDiv>
            <ChildDiv> <Card/></ChildDiv>
            <ChildDiv> <Card/></ChildDiv>

            <ChildDiv> <Card/></ChildDiv>
            <ChildDiv> <Card/></ChildDiv>
            <ChildDiv> <Card/></ChildDiv>
        </Div>
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


const ButtonStrip = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`
const Button = styled.button`
  /*format remove*/
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

`

const LeftDiv = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 150px;
  padding: 10px;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    text-align: center;
  }
`

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


const RightDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;

  .row {
    width: 100%;

    > input {
      width: 100%;
    }
  }
`


const Input = styled.input`
  height: 50px;
  width: 90%;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 20px;
  background-color: transparent;
  padding: 10px 30px;
  margin-left: 60px;
  color: black;
  border: 1px solid rgba(143, 143, 143, 0.5);

  ::placeholder {
    font-size: 18px;
    text-align: left;
    color: black;

  }
`


const SearchBox = styled.div`
  width: 100%; /* width fit-content */
  position: relative; /* position relative to the parent */
  padding-right: 80px;
`

const SearchButton = styled.button`
  height: 50px;
  width: 50px;
  outline: none;
  border-style: none;
  right: 110px;
  font-size: 22px;
  cursor: pointer;
  border-radius: 40%;
  background-color: transparent;
  position: absolute;
  /*color: #ffffff;*/
  pointer-events: painted;
`

function UserProfile(props) {
    const {status} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/wallet-authentication';
    }
    const [activeButton, setActiveButton] = useState("all");
    const [name, setName] = useState("John Doe");
    const [account, setAccount] = useState("0x13ccCb7B1b524c73486b7EC58dDA0Fa5A0763FAd")
    const [modalIsOpen, setIsOpen] = React.useState(false);
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


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }

    const switchCase = (value) => {
        switch (value) {
            case 'all':
                return <Items/>;
            case 'sports':
                return <Items/>;
            case 'music':
                return <Items/>;
            case 'arts':
                return <Items/>;
            case 'collectibles':
                return <Items/>;
            case 'trending_cards':
                return <Items/>;
            case 'utilities':
                return <Items/>;
            case 'photography':
                return <Items/>;
        }
    }
    const [value, setValue] = useState(true);

    return (<div>
            <Header pageTitle={"Explore NFTs"} linkTree={"explore"} profilePic={profilePic}/>

            <Modal1
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            />
            <Container>
                <LeftDiv>
                    <div className={'title-bar'}>
                        <h3>Filters</h3>
                        <div>Reset</div>
                    </div>
                    <CardDiv>
                        <div className={'row'}>
                            <div>Status</div>
                            <div><img src={downarrow} alt=""/></div>
                        </div>
                        <div className={'body-row'}>
                            <div>Buy Now</div>
                            <div>On Auction</div>
                            <div>New</div>
                            <div>Has Offers</div>
                            <div>All</div>
                        </div>
                    </CardDiv>
                    <CardDiv>
                        <div className={'row'}>
                            <div>Chains</div>
                            <div><img src={downarrow} alt=""/></div>
                        </div>
                        <div className={'body-col'}>
                            <div className={'rec'}>
                                <div><label><input type="checkbox" onChange={(event) => {
                                    console.log(event.target.checked)
                                }}/> Ethereum
                                </label>
                                </div>
                                <div>116</div>
                            </div>
                            <div className={'rec'}>
                                <div><label><input type="checkbox" onChange={(event) => {
                                    console.log(event.target.checked)
                                }}/> Polygon
                                </label>
                                </div>
                                <div>116</div>
                            </div>
                            <div className={'rec'}>
                                <div><label>
                                    <input type="checkbox" onChange={(event) => {
                                        console.log(event.target.checked)
                                    }}/> Avalanche
                                </label>
                                </div>
                                <div>116</div>
                            </div>
                            <div className={'rec'}>
                                <div><label><input type="checkbox" onChange={(event) => {
                                    console.log(event.target.checked)
                                }}/> Solana
                                </label>
                                </div>
                                <div>116</div>
                            </div>
                            <div className={'rec'}>
                                <div><label><input type="checkbox" onChange={(event) => {
                                    console.log(event.target.checked)
                                }}/> Optimism
                                </label>
                                </div>
                                <div className={'label'}>116</div>
                            </div>
                        </div>
                    </CardDiv>
                    <CardDiv>
                        <div className={'row'}>
                            <div>Price</div>
                            <div><img src={downarrow} alt=""/></div>
                        </div>
                        <div className={'body-row'}>


                            <div className="slidecontainer">
                                <p>Custom range slider:</p>
                                <input type="range" min="1" max="100" className="slider" id="myRange" onChange={
                                    (event) => {
                                        console.log(event.target.value)
                                    }
                                }/>
                            </div>
                        </div>
                    </CardDiv>
                    <CardDiv>
                        <div className={'row'}>
                            <div>Currency</div>
                            <div><img src={downarrow} alt=""/></div>
                        </div>

                    </CardDiv>
                    <CardDiv>
                        <div className={'row'}>
                            <div>Quantity</div>
                            <div><img src={downarrow} alt=""/></div>
                        </div>

                    </CardDiv>
                </LeftDiv>
                <RightDiv>
                    <SearchBox>
                        <SearchButton className="btn-search"><i className="fas fa-search "></i></SearchButton>
                        <Input type="text" placeholder="Search here"/>
                    </SearchBox>
                    <Items/>
                </RightDiv>


            </Container>
            <Footer/>
        </div>
    )
}

export default UserProfile;