import './Card.css';
import {useEffect, useState} from "react";
import {convertImage} from "../Controller";

const img1 = process.env.PUBLIC_URL + '/hero-section-1/glass.png';
const eth = process.env.PUBLIC_URL + '/Eth.png';
const avitar1 = process.env.PUBLIC_URL + '/avatar1.png';


function Card({image, title, description, price}) {
    const [imageFile, setImageFile] = useState(image);

    if (imageFile === undefined || imageFile === null || imageFile === "") {
        setImageFile(img1)
    }
    useEffect(() => {
        if (imageFile === undefined || imageFile === null || imageFile === "") {
            setImageFile(img1)
        } else {
            convertImage(imageFile, 150, 100).then((result) => {
                setImageFile(result);
            });
        }
    }, [imageFile]);


    return (<div className="card">
        <img className={'card-image'} src={imageFile} alt="Avatar"/>
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
                        <div>{description}</div>
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
