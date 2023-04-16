import './Card.css';
import FileResizer from "react-image-file-resizer";
import {useState} from "react";

const img1 = process.env.PUBLIC_URL + '/hero-section-1/glass.png';
const eth = process.env.PUBLIC_URL + '/Eth.png';
const avitar1 = process.env.PUBLIC_URL + '/avatar1.png';

function Card({imageFile, name, title, price}) {
    const [image, setImage] = useState(imageFile);
    const resizeFile = (file) =>
        new Promise((resolve) => {
            FileResizer.imageFileResizer(
                file,
                100, 150,
                "PNG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    if (imageFile) {
        resizeFile( imageFile).then((result) => {
            setImage(result);
        });
    }
    return (<div className="card">
        {image ? <img className={'card-image'} src={image} alt="Avatar"/> :
            <img className={'card-image'} src={img1} alt="Avatar"/>}
        <div className="card-body">

            <div className="container">
                <div className="card-title">
                    <div>{title}</div>
                    <div><img src={eth} alt="eth"/></div>
                </div>

                <div className={'card-subsection'}>
                    <img src={avitar1} alt=""/>
                    <div>
                        <div>Creator</div>
                        <div>{name}</div>
                    </div>
                    <div>
                        <div>Price</div>
                        <div>{price} ETH</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
        ;
}

export default Card;
