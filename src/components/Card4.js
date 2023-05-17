import styled from 'styled-components';

const avitar1 = process.env.PUBLIC_URL + '/avatar1.png';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  background: rgb(27, 27, 27);
  /*background: #FE3796;*/
  padding: 20px 10px;
  margin: 10px;
  position: relative;
  width: 300px;
  height: 320px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 10px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  padding:  10px;
  margin: 0;
  background: rgb(27, 27, 27);

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 8px;
  }
`

const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px ;

  .image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;

  }

`

const LeftDiv = styled.div`
  border-radius: 10px;
  //margin: 10px;
  width: 100%;
  height: 100%;
  background: white;
  //margin: 5px;
  //padding: 10px;
  //  
`
const RightDiv = styled.div`
  display: flex;
  padding: 0px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0 ;
  width: 100%;
  height: 100%;

  //background: white;
  div {
    background: white;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    margin: 2px 2px;
  }
`

function Card4({image1, image2, image3, mainImage}) {
    return (<Container>
        <Header><img src={avitar1} alt="avitar1"/>
            <div>
                <div>Next Future Abstract</div>
                <div>SpaceX Club</div>
            </div>
        </Header>
        <Body>
            <LeftDiv>
                <div className={'image'}>
                    <img src={mainImage} alt=""/>
                </div>
            </LeftDiv>
            <RightDiv>
                <div className={'image'}>
                    <img src={image1} alt=""/>
                </div>
                <div className={'image'}>
                    <img src={image2} alt=""/>
                </div>
                <div className={'image'}>
                    <img src={image3} alt=""/>
                </div>
            </RightDiv>
        </Body>
    </Container>)
}


export default Card4;
