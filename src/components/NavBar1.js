import './NavBar1.css';
import {Link} from "react-router-dom";
import DropDown from "./DropDown";
import {useState} from "react";

const profilePic = process.env.PUBLIC_URL + '/profile-images/profile.png';
const arrow_down = process.env.PUBLIC_URL + '/arrow-down.svg';
const metamask = process.env.PUBLIC_URL + '/WalletAuthentication/MetaMask_Fox.png';
const moon = process.env.PUBLIC_URL + '/moon.svg';


/**
 *  this is the NavBar1 component and this is part of the LandingPage component.
 *  @param props
 * */
function NavBar1({status}) {
    const [open, setOpen] = useState(false)
    const handleDropdown = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

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
            <Link className={'blackA'} to={'/stats'}>

                <div>Stats <img src={arrow_down} alt="arrow-down.svg" height={'10'}/></div>
            </Link>

            <Link className={'blackA'} to={'/create-nft'}>
                <div>Create <img src={arrow_down} alt="arrow-down.svg" height={'10'}/></div>
            </Link>
            <div className={'right-button-links'}>


                {status === "connected" ?
                    <div style={{position: 'relative',zIndex:'2'}}>
                        <DropDown open={open} items={[1, 2, 3, 4]}/>

                        <img className={'circle'} src={profilePic} alt="profile"
                             height="80" width="80" onClick={() => {
                            handleDropdown()
                        }}/>
                    </div> :
                    <div className={'item'}>
                        <Link to={'/authentication'}>
                            <img src={metamask} alt="Trolly" height="20" width="20"/>
                        </Link>
                    </div>}

                <div className={'item'}>
                    <img src={moon} alt="moon" height="20" width="20"/>
                </div>
            </div>
        </div>

    </div>);
}

export default NavBar1;