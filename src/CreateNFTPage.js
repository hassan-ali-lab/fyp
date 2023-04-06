import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";

const image1 = process.env.PUBLIC_URL + '/CreateNFT/image1.png';
const image2 = process.env.PUBLIC_URL + '/CreateNFT/image2.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  color: #777E90;
  width: 50%;
  margin: 0 auto;
  height: 600px;

  .main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    height: 70%;

    .image {
      margin-bottom: 10px;
      //border: 1px solid #bd3535;
      border-radius: 5%;
    }
  }
`

const Card = styled.div`
  width: 100px;
  height: 100px;
  //background-color: #bd3535;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function CreateNFTPage(props) {
    return (<div>
        <Header/>
        <Container>
            <div>Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to
                sell <br/> one collectible multiple times
            </div>

            <div className={'main'}>
                <Card><img className={'image'} src={image1} alt=""/>
                    <div>Single NFT</div>
                </Card>
                <Card><img className={'image'} src={image2} alt=""/>
                    <div>Multiple NFT</div>
                </Card>
            </div>
            <div>We do not own your private keys and cannot access your funds without your confirmation.</div>
        </Container>
        <Footer/>
    </div>);
}

export default CreateNFTPage;