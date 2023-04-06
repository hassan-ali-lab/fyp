import './Section2.css';
import Card2 from "./Card2";

function Section2(props) {
    return (<div className={'section2'}>

        <h1>Get Started In 3 Steps</h1>
        <div className={'cards-3'}>
            <Card2/>
            <Card2/>
            <Card2/>
        </div>
    </div>);
}

export default Section2;