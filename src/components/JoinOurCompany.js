import styled from 'styled-components';

const image_url = process.env.PUBLIC_URL + '/news_update/Join Community.png';
const Container = styled.div`
  background-image: url('${image_url}');
  //background-repeat: no-repeat;
  background-size: 100% 100%;
  //background-position: center;
  height: 350px;
  width: 90%;
  //background-color: #8d3535;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 30px 0 30px 0;
  border: 1px solid #8d3535;
  border-radius: 20px;
  text-align: center;
  color: white;
  translate: 0 150px;
`

const Button = styled.button`
  background-color: #FE3796;
  border: 1px solid #FE3796;
  border-radius: 100px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  outline: none;
  padding: 10px 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: 160px;
`

function JoinOurCompany() {
    return (<Container>
        <h1>Join Our Community</h1>
        <div>The World's Largest Digital Marketplace For Crypto Collectibles<br/> And Non-Fungible Tokens</div>
        <Button>Join Now</Button>

    </Container>);
}


export default JoinOurCompany;