import './NavBar1.css';
import {Link} from "react-router-dom";

const arrow_down = process.env.PUBLIC_URL + '/arrow-down.svg';
const trolly = process.env.PUBLIC_URL + '/trolly.svg';
const moon = process.env.PUBLIC_URL + '/moon.svg';


/**
 *  this is the NavBar1 component and this is part of the LandingPage component.
 *  @param props
 * */
function NavBar1(props) {
    return (<div className="navbar1">
        <div className={'searchbar'}>
            <h3 className="logo">BuidlNFT</h3>
            <div className="search-box">
                <button className="btn-search"><i className="fas fa-search"></i></button>
                <input type="text" className="input-search" placeholder="Search here"/>
            </div>
        </div>
        <div className={'right-links'}>
            <Link className={'blackA'} to={'/explore-nfts'}>
                <div>Explore <img src={arrow_down} alt="arrow-down.svg" height={'10'}/></div>
            </Link>
            <div>Stats <img src={arrow_down} alt="arrow-down.svg" height={'10'}/></div>
            <Link className={'blackA'} to={'/create-nft'}>
                <div>Create <img src={arrow_down} alt="arrow-down.svg" height={'10'}/></div>
            </Link>
            <div className={'right-button-links'}>
                <div><img src={trolly} alt="Trolly" height="20" width="20"/></div>
                <div><img src={moon} alt="moon" height="20" width="20"/></div>
            </div>
        </div>

    </div>);
}

export default NavBar1;