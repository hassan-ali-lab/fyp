import "./Section3.css";
import Card3 from "./Card3";

const image1 = process.env.PUBLIC_URL + '/live-auction/1.png';
const image2 = process.env.PUBLIC_URL + '/live-auction/2.png';
const image3 = process.env.PUBLIC_URL + '/live-auction/3.png';
const image4 = process.env.PUBLIC_URL + '/live-auction/4.png';
const image5 = process.env.PUBLIC_URL + '/live-auction/5.png';
const image6 = process.env.PUBLIC_URL + '/live-auction/6.png';
const image7 = process.env.PUBLIC_URL + '/live-auction/7.png';
const image8 = process.env.PUBLIC_URL + '/live-auction/8.png';
const image9 = process.env.PUBLIC_URL + '/live-auction/9.png';
const image10 = process.env.PUBLIC_URL + '/live-auction/10.png';
const image11 = process.env.PUBLIC_URL + '/live-auction/11.png';
const image12 = process.env.PUBLIC_URL + '/live-auction/12.png';
const image13 = process.env.PUBLIC_URL + '/live-auction/13.png';
const image14 = process.env.PUBLIC_URL + '/live-auction/14.png';
const image15 = process.env.PUBLIC_URL + '/live-auction/15.png';
const image16 = process.env.PUBLIC_URL + '/live-auction/16.png';


function Section3LiveAuction() {
    return (<div className={'section3'}>
        <div className={'title-bar'}>
            <div>Live Auction</div>
            <div>View All</div>
        </div>
        <div className={'cards-alignment-sec'}>
            <Card3 image={image1}/>
            <Card3 image={image2}/>
            <Card3 image={image3}/>
            <Card3 image={image4}/>
        </div>
        <div className={'cards-alignment-sec'}>
            <Card3 image={image5}/>
            <Card3 image={image6}/>
            <Card3 image={image7}/>
            <Card3 image={image8}/>
        </div>
        <div className={'cards-alignment-sec'}>
            <Card3 image={image9}/>
            <Card3 image={image10}/>
            <Card3 image={image11}/>
            <Card3 image={image12}/>
        </div>
        <div className={'cards-alignment-sec'}>
            <Card3 image={image13}/>
            <Card3 image={image14}/>
            <Card3 image={image15}/>
            <Card3 image={image16}/>
        </div>
    </div>);
}

export default Section3LiveAuction;