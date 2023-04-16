import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import React, {useState} from "react";
import Card from "./components/Card";
import Modal1 from "./Modals/Modal1";
import {Link} from "react-router-dom";

const profilePic = process.env.PUBLIC_URL + '/profile-images/profile.png';
const eth = process.env.PUBLIC_URL + '/Eth.png';
const arrow45 = process.env.PUBLIC_URL + '/creator-profile/arrow45.svg';
const share = process.env.PUBLIC_URL + '/creator-profile/share_icon.svg';
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

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
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
`
const Items = (cards) => {
    return <ContainerDiv><Div>
        <ChildDiv> <Card/></ChildDiv>
        <ChildDiv> <Card/></ChildDiv>
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

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    text-align: center;
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px;

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

    }
  }
`

const RightDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`

function UserProfile(props) {
    const [activeButton, setActiveButton] = useState("items");
    const [name, setName] = useState("John Doe");
    const [account, setAccount] = useState("0x13ccCb7B1b524c73486b7EC58dDA0Fa5A0763FAd")
    const [modalIsOpen, setIsOpen] = React.useState(true);

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
            case 'items':
                return <Items/>;
            case 'activity':
                return <Items/>;
            default:
                return <div>No Such Items</div>
        }
    }


    return (<div>
        <Header pageTitle={"Collections"} linkTree={"Creators"} profilePic={profilePic}/>
        <Modal1
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
        />
        <Container>
            <CircularImage src={profilePic}/>
            <LeftDiv>
                <h3>{name}</h3>
                <p>{account.slice(0, 5)}...{account.slice(35,)}</p>
                <p>A collection of Beautiful NFTs where you could find a world of arts</p>
                <div className={'row'}>
                    <div><h4>96</h4><p>Followers</p></div>
                    <div><h4>247</h4><p>Following</p></div>
                    <div><h4>1542</h4><p>Items</p></div>
                </div>
                <div className={'col'}>
                    <div className={'row'}>
                        <div>Floor</div>
                        <div><img src={eth} alt=""/> 72 ETH</div>
                    </div>
                    <div className={'row'}>
                        <div>Total Volume</div>
                        <div><img src={eth} alt=""/> 79.56K ETH</div>
                    </div>

                    <div className={'row'}>
                        <div>Blockchain</div>
                        <div> ETH</div>
                    </div>
                    <div className={'row'}>
                        <div>Owners</div>
                        <div> 21.6K</div>
                    </div>
                </div>
                <div className={'row'}>
                    <PinkButton>Follow</PinkButton> <Link to={'/'}> <img src={arrow45} alt=""/></Link> <img src={share} alt="share"/>
                </div>
            </LeftDiv>
            <RightDiv>
                <ButtonStrip>
                    <Button onClick={
                        () => {
                            setActiveButton("items")
                        }
                    }>Items</Button>
                    <Button onClick={
                        () => {
                            setActiveButton("activity")
                        }
                    }>Activity</Button>
                </ButtonStrip>
                {switchCase(activeButton)}

            </RightDiv>


        </Container>
        <Footer/>
    </div>)
}

export default UserProfile;