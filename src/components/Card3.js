import './Card.css';
import './Card3.css';

// const img1 = process.env.PUBLIC_URL + '/hero-section-1/glass.png';
const eth = process.env.PUBLIC_URL + '/Eth.png';
const avitar1 = process.env.PUBLIC_URL + '/avatar1.png';
const cd3 = process.env.PUBLIC_URL + '/card3.svg';


function Card3({image, title}) {
    return (<div className="card">
        <img className={'card-image'} src={image} alt="Avatar"/>


        <div className="card-body">
            <div className="btn-timer" role="button"><img src={cd3} alt=""/> 05:38:40</div>

            <div className="container">
                <div className="card-title">
                    <div>{title}</div>
                    <div><img src={eth} alt="eth"/></div>
                </div>

                <div className={'card-subsection'}>
                    <img src={avitar1} alt=""/>
                    <div>
                        <div>Creator</div>
                        <div>Thappier Fresco</div>
                    </div>
                    <div>
                        <div>Highest Bid</div>
                        <div>6.38 ETH</div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Card3;
