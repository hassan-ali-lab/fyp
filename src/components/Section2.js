import './Section2.css';
import Card2 from "./Card2";

const img1 = process.env.PUBLIC_URL + '/section2/1.svg';
const img2 = process.env.PUBLIC_URL + '/section2/2.svg';
const img3 = process.env.PUBLIC_URL + '/section2/3.svg';

function Section2(props) {
    return (<div className={'section2'}>

        <h1>Get Started In 3 Steps</h1>
        <div className={'cards-3'}>
            <Card2 image={img1} title={'Connect Your Wallet'} description={'Once You\'ve Set Up Your Wallet Of Choice, Connect It To Block3 by Clicking The NFT Marketplace In The Top Right Corner.'}/>
            <Card2 image={img2} title={'Create Your NFT Store'} description={'Click Create And Set Up Your Collection. Add Social Links, Profile Images, And A Secondary Sales Fee.'}/>
            <Card2 image={img3} title={'Start Selling & Growing'} description={'Choose Between Auctions, Fixed-Price Listings, And Declining-Price Listings. You Choose How You Want To Sell Your NFTs!'}/>
        </div>
    </div>);
}

export default Section2;