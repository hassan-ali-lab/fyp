import {Link} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";
import DropDown from "./DropDown";

const header_image_url = process.env.PUBLIC_URL + '/header/Header.png';
const arrow_down_url = process.env.PUBLIC_URL + '/header/arrow-down-white.svg';
const cart = process.env.PUBLIC_URL + '/header/Cart.svg';
const night_mode = process.env.PUBLIC_URL + '/header/Night mode.svg';

// pageTitle: string
// linkTree: string

const Container = styled.div`
  background-image: url(${header_image_url});
  // background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 400px;
  color: #fff;

  .logo {
    font-family: 'Poppins', sans-serif;
    color: #fff;
    font-size: 26px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;

  }

  .heading {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;

    .header-text {
      font-size: 50px;
      margin-bottom: 20px;
    }
  }

`

const Navbar = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  i {
    color: #fff;
  }
`
const SearchBox = styled.div`

  width:75%; /* width fit-content */
  position: relative; /* position relative to the parent */
  padding-right: 80px;
`

const Button = styled.button`
  height: 50px;
  width: 50px;
  outline: none;
  border-style: none;
  right: 160px;
  font-size: 22px;
  cursor: pointer;
  border-radius: 40%;
  background-color: transparent;
  position: absolute;
  /*color: #ffffff;*/
  pointer-events: painted;
`
const Input = styled.input`
  height: 50px;
  max-width: 400px;
  min-width: 250px;
  width: 70%;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 20px;
  background-color: transparent;
  padding: 10px 30px;
  margin-left: 60px;
  color: #ffffff;
  border: 1px solid rgba(143, 143, 143, 0.5);

  ::placeholder {
    font-size: 18px;
    text-align: left;
    color: #ffffff;

  }
`

const Links = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 25px;
  align-self: flex-end;

  .item {
    margin: 0 10px;

  }

  .linear {


    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    border: 1px solid #ffffff44;
    height: 60px;
    width: 60px;
    border-radius: 70%;
  }
`

function Header(props) {
    const [open, setOpen] = useState(false)
    const handleDropdown = () => {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }
    return (<Container>
        <Navbar>
            <div className="logo"><Link className={'whiteA'} to={'/'}> BuidlNFT</Link></div>
            <SearchBox>
                <Button className="btn-search"><i className="fas fa-search "></i></Button>
                <Input type="text" placeholder="Search here"/>
            </SearchBox>
            <Links>
                <Link className={'whiteA'} to={'/explore-nfts'}>
                    <div className={'item'}>Explore
                        <img src={arrow_down_url} alt="arrow-down.svg" height={'10'}/>
                    </div>
                </Link>
                <div className={'item'}>Stats <img src={arrow_down_url} alt="arrow-down.svg" height={'10'}/></div>
                <Link to={'/create-nft'} className={'whiteA'}>
                    <div className={'item'}>Create <img src={arrow_down_url} alt="arrow-down.svg" height={'10'}/></div>
                </Link>
                <div className={'linear item'}>
                    {props.profilePic ?
                        <div style={{position: 'relative'}}>
                            <DropDown open={open} items={[1, 2, 3, 4]}/>

                            <img className={'circle'} src={props.profilePic} alt="profile"
                                 height="80" width="80" onClick={() => {
                                handleDropdown()
                            }}/>
                        </div>
                        : ""}
                    <div className={'circle'}><img src={cart} alt="Trolly" height="80" width="80"/></div>
                    <div className={'circle'}><img src={night_mode} alt="moon" height="80" width="80"/></div>
                </div>
            </Links>
        </Navbar>
        <div className={'heading'}>
            <div className={'header-text'}>
                {props.pageTitle}
            </div>
            <div className={'sub-text'}>
                <Link className={'whiteA'} to={'/'}>Home</Link> / {props.linkTree}
            </div>
        </div>
    </Container>)
        ;
}

export default Header;