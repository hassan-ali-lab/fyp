import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import Button from "./Button";

const icon = process.env.PUBLIC_URL + '/dropdown_manu_images/icon.png';

const Container = styled.div`
  position: absolute;
  ${
          props => props.open === true ?
                  css`
                    display: flex;
                  ` : css`
                    display: none;
                  `}
  width: 400px;
  padding: 10px 0;
  top: 70px;
  right: -30px;
  background-color: white;
  overflow-y: visible;
  //display: nne;
  border: 1px solid grey;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;

  .header {
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .items {
    list-style-type: none;
    width: 90%;
  }

  .menu-item {
    > img {
      border-radius: 15px;
      border: 1px solid grey;
    }

    > .data {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      margin-left: 10px;
      width: 70%;
    }

    .circle {
      background-color: deeppink;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      justify-self: flex-end;
    }
  }

  .items > li {
    color: black;
    margin: 0;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .items > li:hover {
    background-color: lightgray;
    border-radius: 15px;
    border: 1px solid grey;
  }

  .items > li > button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    text-align: left;
    color: inherit;
    border: none;
    padding: 5px;
    margin: 0;
    font: inherit;
    cursor: pointer;
  }

`


function DropDown({open, items}) {
    return <Container open={open}>

        <div className={'header'}>
            <div className={'blackA'}>Notification</div>
            <Button primary to={'/notifications'} name={'See All'}/></div>
        <ul className={'items'}>
            {
                items.map((menuItem, index) => (
                    <li key={menuItem} className="menu-item">
                        <img className={'image'} src={icon} alt=""/>
                        <div className={'data'}>
                            <h3>Eth Received</h3>
                            <p>0.8 Eth Recieved</p>
                            <h6>2 days ago</h6>
                        </div>
                        <div className={'circle'}></div>
                    </li>
                ))}
            
        </ul>

    </Container>
}

export default DropDown;