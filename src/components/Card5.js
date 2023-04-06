import styled from 'styled-components';

const cover_url = process.env.PUBLIC_URL + '/card5/cover.png';
const profile_pic_url = process.env.PUBLIC_URL + '/card5/profile.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 0;
  margin: 30px;
  position: relative;
  width: 180px;
  height: 250px;
  border: 1px solid #ffffff;
  border-radius: 25px;
  background: white;

  .cover {
    margin: 5px;
    width: 90%;
    border-radius: 25px;
  }

  .body {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .name {
      font-weight: bold;
      //margin-top: 10px;
      padding-top: 30px;
    }
  }

  .profile {
    position: absolute;
    top: -30px;
    left: 35%;
  }
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #FE3796;
  border-radius: 100px;
  box-sizing: border-box;
  color: #FE3796;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom:10px ;
  outline: none;
  padding: 10px 40px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;
`


function Card5() {
    return (
        <Container>
            <img className={'cover'} src={cover_url} alt={'cover'}/>
            <div className={'body'}>
                <img className={'profile'} src={profile_pic_url} alt="profile"/>
                <div className={'name'}>Ralph Edwards</div>
                <Button>Follow</Button>
            </div>
        </Container>
    );
}

export default Card5;