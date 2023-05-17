import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Card from "./components/Card";
import Modal1 from "./Modals/Modal1";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {marketaddress, nftaddress} from "./config";
import NFT from "./build/contracts/NFT.json";
import Marketplace from "./build/contracts/Marketplace.json";
import axios from "axios";
import {useMetaMask} from "metamask-react";
import {getAllNFTs, getMyNFTs} from "./Controller";
import {Link} from "react-router-dom";
// import pinata api
// import pinataSDK,{} from '@pinata/sdk';
const profilePic = process.env.PUBLIC_URL + '/profile-images/profile.png';

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
`

const RightDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`

function UserProfile({_name, _account}) {
    const {status} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/authentication';

    }


    const [activeButton, setActiveButton] = useState("collected");
    const [name, setName] = useState("John Doe");
    const [account, setAccount] = useState("0x1f0314482a9ee9c20db30ff8a43cc5dcc8af83e2");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [content, setContent] = useState([]);

    if (name === undefined) {
        setName("John Doe");
    }
    if (account === undefined) {
        setAccount("0x1f0314482a9ee9c20db30ff8a43cc5dcc8af83e2");
    }

    /*  function openModal() {
          setIsOpen(true);
      }*/

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        let promise = getMyNFTs()
        console.log(promise)
        promise.then((data) => {
            setContent(data)
        })
    }, [activeButton])

    const Items = ({content}) => {
        console.log(content)

        return (<ContainerDiv>
            <Div>
                {content.map((item, index) => {
                    return <ChildDiv key={item.itemId}><Link to={`/nft-details/${item.itemId}`}><Card
                        key={index} {...item}/></Link></ChildDiv>
                })}
            </Div>
            <PinkButton>Load More</PinkButton>
        </ContainerDiv>)

        //
        // async function loadNFTs() {
        //
        //     const web3Modal = new Web3Modal()
        //     const connection = await web3Modal.connect()
        //     const provider = new ethers.providers.Web3Provider(connection)
        //     const signer = provider.getSigner()
        //
        //     const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        //     const marketContract = new ethers.Contract(marketaddress, Marketplace.abi, signer)
        //     const data = await marketContract.getMyNFTs()
        //     console.log(data)
        //
        //     const items = await Promise.all(data.map(async i => {
        //         const tokenUri = await tokenContract.tokenURI(i.tokenId)
        //         // we want get the token metadata - json
        //         const meta = await axios.get(tokenUri)
        //         let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        //         let item = {
        //             price,
        //             tokenId: i.tokenId.toNumber(),
        //             seller: i.seller,
        //             owner: i.owner,
        //             image: tokenUri,
        //             name: i.name,
        //             description: i.description
        //         }
        //         console.log(meta)
        //         return item
        //     }))
        //
        //     setNfts(items)
        //     // setLoading(true)
        // }
        //
        // switch (props.type) {
        //     case 'collected': {
        //         break;
        //     }
        //     case 'created': {
        //         return <ContainerDiv><Div>
        //             {nfts.map((nft, i) => {
        //                 let image = nft.image;
        //                 // const fileReader = new FileReader();
        //                 const config = {responseType: 'blob'};
        //
        //                 axios.get(image, config).then(response => {
        //                     image = new File([response.data], 'image.png');
        //                 });
        //                 // fileReader.readAsDataURL(imageFile);
        //                 // fileReader.onload = () => {
        //                 //     imageFile = fileReader.result;
        //                 //
        //                 // }
        //                 return (
        //                     <ChildDiv key={i}>
        //                         <Card
        //                             imageFile={image}
        //                             title={nft.name}
        //                             description={nft.description}
        //                             price={nft.price}
        //                             tokenId={nft.tokenId}
        //                         />
        //                     </ChildDiv>
        //                 )
        //             })}
        //         </Div>
        //             <PinkButton>Load More</PinkButton>
        //         </ContainerDiv>
        //
        //     }
        //     case 'favorited': {
        //
        //
        //         break;
        //     }
        //     case "activity": {
        //
        //
        //         break;
        //     }
        //     case "inactive_listings": {
        //
        //
        //         break;
        //     }
        //     default:
        //         return <div>No Such Items</div>
        // }


    }


    return (<div>
        <Header pageTitle={"My Profile"} linkTree={"profile"} profilePic={profilePic}/>
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
            </LeftDiv>
            <RightDiv>
                <ButtonStrip>
                    <Button onClick={
                        () => {
                            setActiveButton("collected")
                        }
                    }>Collected</Button>
                    <Button onClick={
                        () => {
                            setActiveButton("created")
                        }
                    }>Created</Button>
                    <Button onClick={
                        () => {
                            setActiveButton("favorited")
                        }
                    }>Favoured</Button>
                    <Button onClick={
                        () => {
                            setActiveButton("activity")
                        }
                    }>Activity</Button>
                    <Button onClick={
                        () => {
                            setActiveButton("inactive_listings")
                        }
                    }>Inactive Listing</Button>
                </ButtonStrip>
                {<Items content={content} type={activeButton}/>}

            </RightDiv>


        </Container>
        <Footer/>
    </div>)
}

export default UserProfile;