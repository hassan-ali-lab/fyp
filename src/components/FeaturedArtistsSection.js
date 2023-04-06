import styled from 'styled-components';
import Card5 from "./Card5";
import NewsAndUpdatesSection from "./NewsAndUpdatesSection";
import JoinOurCompany from "./JoinOurCompany";
// accessing static file in react
const image_url = process.env.PUBLIC_URL + '/featured-artists-section-bg.png';
const Container = styled.div`
  width: 100%;
  height: 2000px;
  // get the image from host public folder
  background-image: url(${image_url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  //background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  //padding-top: 100px;

`

const FeaturedArtists = styled.div`
  margin-top: 300px;
  width: 90%;
  height: 100px;
  //background-color: #8d3535;


  div {
    display: inline-block;
    float: right;

    //align-items: center;
    //justify-content: center;
    //margin: 30px;
  }

  .nft-collection-title {
    float: left;
  }

  span {
    color: #FE3796;
  }
`
const CardsSection = styled.div`
  width: 90%;
  height:600px;
  //background-color: #8d3535;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0 0 100px 0;
`

function FeaturedArtistsSection() {
    return (<Container>
        <FeaturedArtists>
            <div className={'nft-collection-title'}><h2>Featured Artists</h2></div>
            <div><span>View All</span></div>
        </FeaturedArtists>
        <CardsSection>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
            <Card5/>
        </CardsSection>
        <NewsAndUpdatesSection/>
        <JoinOurCompany/>
    </Container>);
}

export default FeaturedArtistsSection;