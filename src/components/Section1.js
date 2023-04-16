import './Section1.css';
import Card from "./Card";

// import section1Background from '../images/section1/1st Section.png'
const section1Background = process.env.PUBLIC_URL + '/section1/1st Section.png';


function section1(props) {
    return (<div className="section1">
        <img className={'section-1-background-image'} src={section1Background} alt="Background"/>
        <div className={'div1'}>
            <h1>We have the Finnest NFT <br/> Digital Artists</h1>
            <div className={'section1-subtitle'}>The World's Largest Digital Marketplace For Crypto Collectibles
                And <br/> Non-Fungible Tokens
            </div>
            <div className={'statistics'}>
                <div className={'item1'}>
                    <h1>11,593</h1>
                    <div>Collectibles</div>
                </div>
                <div className={'item2'}>
                    <h1>1,200</h1>
                    <div>Auctions</div>
                </div>
                <div className={'item3'}>
                    <h1>5,983</h1>
                    <div>Artists</div>
                </div>
            </div>
            <button className="button-23" onClick={
                () => {
                    window.location.href = "/create-nft"
                }
            }>Create
            </button>
        </div>
        <div className={'div2'}>
            <div className={'disp-card card1'}>
                <Card title={'Army1934'}/>
            </div>

            <div className={'disp-card card2'}>
                <Card title={'Army1934'}/>
            </div>
            <div className={'disp-card card3'}>
                <Card title={'Army1934'}/>
            </div>
            <div className={'disp-card card4'}>
                <Card title={'Army1934'}/>
            </div>

            <div className={'disp-card card5'}>
                <Card title={'Army1934'}/>
            </div>
            <div className={'disp-card card6'}>
                <Card title={'Army1934'}/>
            </div>
        </div>
    </div>);
}

export default section1;