import styled from 'styled-components';

const a = process.env.PUBLIC_URL + '/news_update/a.png';
const b = process.env.PUBLIC_URL + '/news_update/b.png';
const c = process.env.PUBLIC_URL + '/news_update/c.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 500px;
  margin-top: 200px;
  //background: #595959;

  .images {
    display: flex;
    //flex-direction: row;
    justify-content: start;
    // row revert
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;

    .a {
      height: 500px;
      translate: 400px 0;
    }

    .b {
      height: 400px;
      translate: 0 0;
    }

    .c {
      height: 300px;
      translate: -350px 0;
    }

  }

  .information {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    Width: 100%;
    height: 100%;
    padding: 100px;

    .title {
      font-size: 45px;
    }
  }
`

const SearchBar = styled.div`


  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 50px;
  padding: 20px;
  padding-right: 5px;
  background: white;
  margin-top: 50px;

  border: 1px solid rgba(101, 103, 107, 0.1);
  border-radius: 30px;

  .searchbox {
    border: none;
    width: 100%;
    font-size: 20px;
  }

  .button {
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
  }
`

function NewsAndUpdatesSection() {
    return (<Container>
        <div className={'images'}>
            <img className={'c'} src={c} alt=""/>
            <img className={'b'} src={b} alt=""/>
            <img className={'a'} src={a} alt=""/>
        </div>
        <div className={'information'}>
            <h1 className={'title'}>Subscribe to get fresh news and updates about NFTs</h1>
            <div>The World's Largest Digital Marketplace For Crypto Collectibles And Non-Fungible Tokens</div>
            <SearchBar>
                <input className={'searchbox'} type="text" placeholder={'Enter your email address'}/>
                <button className={'button'}>Join Now</button>
            </SearchBar>
        </div>
    </Container>)
}

export default NewsAndUpdatesSection;