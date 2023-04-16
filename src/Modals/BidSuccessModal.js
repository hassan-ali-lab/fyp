import styled from "styled-components";
import Button from "../components/Button";
import Modal from "react-modal";

Modal.setAppElement('#root');


const green_tick_url = process.env.PUBLIC_URL + '/modal-images/green-tick.svg';
const facebook_url = process.env.PUBLIC_URL + '/modal-images/facebook.svg';
const instagram_url = process.env.PUBLIC_URL + '/modal-images/instagram.svg';
const twitter_url = process.env.PUBLIC_URL + '/modal-images/twitter.svg';
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 100%;
  color: black;
  border: 1px solid white;
  padding: 20px;

  .title {
    margin: 30px;
  }

  .center{
    text-align: center;
    padding: 20px 0;
  }
  .btn {
    width: 100%;

    margin-top: 30px;
  }
`

function BidSuccessModal(props) {


    return (<Modal     {...props}>
            <Card>
                <img src={green_tick_url} alt="" height={'80'}/>
                <h2>Bid Placed Successfully</h2>

                <div className={'center'}>
                    You’ve placed a bid on Golden Skull from <br/> yes_nft club. Please wait until auction <br/>ended.
                </div>
                <div className={'btn'}>
                    <Button primary width={'100%'} onClick={() => {
                        props.onRequestClose()
                    }} name={'View Profile'}/>
                </div>

            </Card>
        </Modal>
    );
}

export default BidSuccessModal;