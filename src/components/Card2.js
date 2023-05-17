import './Card2.css';

function Card2({image, title,description}) {
    return (<div className="card-2">
        <img src={image} alt=""/>
        <h4>{title}</h4>
        <p>{description}</p>
    </div>);
}

export default Card2;
