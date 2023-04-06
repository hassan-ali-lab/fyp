import './Card2.css';

const img1 = process.env.PUBLIC_URL + '/Card Icons.svg';
function Card2(props) {
    return (<div className="card-2">
        <img src={img1} alt=""/>
        <h4>Connect Your Wallet</h4>
        <p>Once You've Set Up Your Wallet Of Choice, Connect It To Block3 by Clicking The NFT Marketplace In The Top
            Right Corner.</p>
    </div>);
}

export default Card2;
