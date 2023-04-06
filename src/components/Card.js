import './Card.css';

const img1 = process.env.PUBLIC_URL + '/hero-section-1/glass.png';
const eth = process.env.PUBLIC_URL + '/Eth.png';
const avitar1 = process.env.PUBLIC_URL + '/avatar1.png';

function Card(props) {
    return (<div className="card">
        <img className={'card-image'} src={img1} alt="Avatar"/>
        <div className="card-body">

            <div className="container">
                <div className="card-title">
                    <div>{props.title}</div>
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

export default Card;
