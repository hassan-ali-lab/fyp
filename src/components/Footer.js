import styled,{css} from 'styled-components';

const image_url = process.env.PUBLIC_URL + '/footer/Footer.png';
const instagram = process.env.PUBLIC_URL + '/footer/instagram.svg';
const linkedin = process.env.PUBLIC_URL + '/footer/linkedin.svg';
const twitter = process.env.PUBLIC_URL + '/footer/twitter.svg';
const arrow = process.env.PUBLIC_URL + '/footer/arrow-left.svg';

const Container = styled.div`
  background-image: url(${image_url});
  //background-repeat: no-repeat;
  background-size: 100% 100%;
  //background-position: center;
  width: 100%; 
  ${  props => props.landingPage ? css`padding-top: 200px;height: 700px;` :  css`padding-top: 100px;height: 600px;`  }
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: #fff;


`
const Section1 = styled.div`
  border-bottom: 1px solid #fff;
  width: 90%;
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .footer-div1 {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    color: #777E90;

    h1 {
      color: #fff;
    }

    .links {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      img {
        margin: 0 20px 0 0;
      }
    }


  }

  .footer-div2 {
    width: 100%;
    height: 100%;
    padding: 0 0 0 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;

  }
`
const Section2 = styled.div`
  border-bottom: 1px solid #fff;
  width: 90%;
  height: 100px;
  display: flex;
  color: #fff;
  justify-content: flex-start;
  align-items: center;

  div {
    margin: 0 40px 0 0;
  }
`
const Section3 = styled.div`
  width: 90%;
  height: 100px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Email = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  border: transparent;
  outline: none;
  //font-size: 24px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  //margin: 0 0 20px 0;
  //padding: 10px;
  //padding-top: 20px;
  position: relative;


  input {

    width: 100%;
    height: 35px;
    //border: none;

    border-radius: 30px;
    padding: 30px;
    //padding-top: 20px;
    font-size: 24px;
    color: #fff;
    line-height: 10px;
    border-color: transparent;

    outline: none;
    background-color: #1B1B1B;

    ::placeholder {
      font-size: 24px;
      text-align: left;

    }
  }

  button {
    position: absolute;
    height: 40px;
    width: 40px;
    outline: none;
    border-style: none;
    right: 15px;
    cursor: pointer;
    border-radius: 50%;
    background-color: deeppink;

    /*color: #ffffff;*/
    pointer-events: painted;

  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 0 0 40px;

  .title {
    margin: 0 0 20px 0;
  }

  p {
    margin: 0 0 10px 0;
    color: #777E90;
  }
`

function Footer(props) {
    return (<Container {...props}>
        <Section1>
            <div className={'footer-div1'}>
                <h1>BuidlNFT</h1>
                <div>Enter your email to get notified by buidlnft for latest updates.</div>
                <div className={'links'}>
                    <img src={twitter} alt=""/>
                    <img src={instagram} alt=""/>
                    <img src={linkedin} alt=""/>
                </div>
                <Email>
                    <button><img src={arrow} alt=""/></button>
                    <input type="text" placeholder="Email Address"/>
                </Email>

            </div>
            <div className={'footer-div2'}>
                <Column>
                    <h3 className={'title'}>BuidlNFT</h3>
                    <p>Explore</p>
                    <p>All NFTs</p>
                    <p>About</p>
                </Column>
                <Column>
                    <h3 className={'title'}>My Account</h3>

                    <p>Profile</p>
                    <p>Favourites</p>
                    <p>Watchlist</p>
                    <p>My Collections</p>
                    <p>Settings</p>
                </Column>
                <Column>
                    <h3 className={'title'}>Resources</h3>

                    <p>Platform Status</p>
                    <p>Partners</p>
                    <p>Taxes</p>
                    <p>Newsletter</p>
                </Column>
                <Column>
                    <h3 className={'title'}>Community</h3>

                    <p>Help Center</p>
                    <p>buidlnft Token</p>
                    <p>Suggest Feature</p>
                    <p>Subscribe</p>
                </Column>
            </div>
        </Section1>
        <Section2>
            <div>Terms</div>
            <div>Privacy Policy</div>
        </Section2>
        <Section3>© buidlnft, Inc @ All Rights Reserved</Section3>

    </Container>);
}

export default Footer;