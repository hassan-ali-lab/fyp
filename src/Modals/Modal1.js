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

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    margin: 20px 0;
  }


  .btn {
    width: 100%;

    margin-top: 30px;
  }
`

function Modal1(props) {

    return (<Modal     {...props}><Card>
            <img src={green_tick_url} alt="" height={'80'}/>
            <h2>Upload Successful</h2>
            <p>You have successfully uploaded your NFT.</p>
            <p>Go to your profile to view it.</p>

            <div className={'title'}>Share your product</div>
            <div className={'links'}>
                <img src={facebook_url} alt="" height={'20'}/>
                <img src={instagram_url} alt="" height={'20'}/>
                <img src={twitter_url} alt="" height={'20'}/>
            </div>
            <div className={'btn'}>
                <Button primary width={'100%'} onClick={() => {
                    window.location.href = '/user-profile'
                }} name={'View Profile'}/>
            </div>

        </Card>
        </Modal>
    );
}

export default Modal1;