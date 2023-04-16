import styled from 'styled-components';
import './NFTTrending.css';

const right_white_arrow = process.env.PUBLIC_URL + '/right_white_arrow.svg';
const left_white_arrow = process.env.PUBLIC_URL + '/left_white_arrow.png';
const down_arrow = process.env.PUBLIC_URL + '/arrow-down-red.svg';
const pic4_2 = process.env.PUBLIC_URL + '/gallery_pic/pic4_2.png';

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

function NFTTrending() {
    return (<div className="nft-trending">
            <div className={'nft-trending-main'}>
                <div className={'nft-trending-title'}>
                    <h1>NFTs’ Trending In <span style={{color: '#FE3796'}}>All Categories <img src={down_arrow}
                                                                                               alt=""/></span>
                    </h1>
                </div>

            </div>
            <div className={'cards-gallery'}>
                <div className="maincard right-card3">
                    <img className={'card-image'} src={pic4_2} alt="Avatar"/>
                </div>
                <div className="maincard left-card3">
                    <img className={'card-image'} src={pic4_2} alt="Avatar"/>
                </div>
                <div className="maincard left-card2">
                    <img className={'card-image'} src={pic4_2} alt="Avatar"/>
                </div>

                <div className="maincard right-card2">

                    <img className={'card-image '} src={pic4_2} alt="Avatar"/>
                </div>
                <div className="maincard left-card1">
                    <img className={'card-image'} src={pic4_2} alt="Avatar"/>
                </div>
                <div className="maincard right-card1">
                    <img className={'card-image'} src={pic4_2} alt="Avatar"/>
                </div>

                <div className="maincard central-card">
                    <img className={'card-image'} src={pic4_2} alt="Avatar"/>
                </div>
            </div>
            <div>
                <CirculerBtn><img src={left_white_arrow} alt=""/></CirculerBtn>
                <CirculerBtn>
                    <img src={right_white_arrow} alt=""/>
                </CirculerBtn>
            </div>
        </div>
    );
}


export default NFTTrending;