import './NFTCollectionExplore.css'
import Card4 from "./Card4";
import styled from "styled-components";
// import left_white_arrow from "../images/left_white_arrow.png";
// import right_white_arrow from "../images/right_white_arrow.svg";
const left_white_arrow = process.env.PUBLIC_URL + '/left_white_arrow.png';
const right_white_arrow = process.env.PUBLIC_URL + '/right_white_arrow.svg';

// styled components
// Circuler Button
const CirculerBtn = styled.div`
  margin: 0 10px;
  display: inline-block;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  text-align: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #ffffff;
  padding: 10px;
`
// Normal Button
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

const Header = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

function NFTCollectionExplore() {
    return (<div className="nft-collection">
        <div className={'nft-collection-title-bar'}>
            <div className={'nft-collection-title'}><h2>Explore Collection</h2></div>
            <div><span style={{color: '#FE3796'}}>View All</span></div>
        </div>

        <div className={'nft-collection-main'}>
            <Header><Button>All NFTs</Button></Header>
            <div className={'nft-collection-body'}>
                {/*row 1*/}
                <Card4/>
                <Card4/>
                <Card4/>
                <Card4/>
            </div>
            <div>
                <CirculerBtn><img src={left_white_arrow} alt=""/></CirculerBtn>
                <CirculerBtn>
                    <img src={right_white_arrow} alt=""/>
                </CirculerBtn>
            </div>
        </div>
    </div>);
}


export default NFTCollectionExplore;