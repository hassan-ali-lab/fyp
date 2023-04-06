import './Hero.css'; // This is the CSS file for this component
// import brain from "../images/hero-section-1/brain.png"; // This is the Image file for this component
// import hand from "../images/hero-section-1/hand.png"; // This is the Image file for this component
// import child from "../images/hero-section-1/child.png"; // This is the Image file for this component
// import glass from "../images/hero-section-1/glass.png"; // This is the Image file for this component
// import hero_background from "../images/hero-background.png"; // This is the Image file for this component
// import img1 from "../images/hero-section-2/img1.png"; // This is the Image file for this component
// import img2 from "../images/hero-section-2/img2.png"; // This is the Image file for this component
// import img3 from "../images/hero-section-2/img3.png"; // This is the Image file for this component
const brain = process.env.PUBLIC_URL + '/hero-section-1/brain.png';
const hand = process.env.PUBLIC_URL + '/hero-section-1/hand.png';
const child = process.env.PUBLIC_URL + '/hero-section-1/child.png';
const glass = process.env.PUBLIC_URL + '/hero-section-1/glass.png';
const hero_background = process.env.PUBLIC_URL + '/hero-background.png';
const img1 = process.env.PUBLIC_URL + '/hero-section-2/img1.png';
const img2 = process.env.PUBLIC_URL + '/hero-section-2/img2.png';
const img3 = process.env.PUBLIC_URL + '/hero-section-2/img3.png';


// This is the function for this component and it is exported at the bottom of the file
function Hero(props) { // This is the function for this component and it is exported at the bottom of the file
    return (<div className={'hero'}>
        <img className={"hero-bg"} src={hero_background} alt={'background'}/>
        <div className={'hero-sec1'}>
            <div className={'image1'}><img className={'hero-image-1'} src={brain} alt="moon"/>
                <img className={'hero-image-3'} src={glass} alt="moon"/></div>
            <div className={'hero-content'}>
                <div className={'hero-text'}>
                    <h1>Buy and Sell</h1>
                    <h1 className={'lg-digital-art'}>Digital Art and</h1>
                    <h1>NFTS</h1>
                </div>
                <div className={'sub-heading'}>The World's Largest Digital Marketplace For Crypto Collectibles And
                    Non-Fungible Tokens
                </div>
                <div>
                </div>
            </div>
            <div className={'image2'}><img className={'hero-image-2'} src={hand} alt="moon"/>
                <img className={'hero-image-4'} src={child} alt="moon"/></div>
        </div>
        <div className={'hero-sec2'}>
            <div className={'center-box'}>
                <img className={'hero-image-5'} src={img1} alt=""/>
                <img className={'hero-image-6'} src={img2} alt=""/>
                <img className={'hero-image-7'} src={img3} alt=""/>
            </div>
        </div>
    </div>);
}

export default Hero;