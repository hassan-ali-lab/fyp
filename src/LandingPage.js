import NavBar1 from "./components/NavBar1"
import Hero from "./components/Hero";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3LiveAuction from "./components/Section3LiveAuction";
import NFTTrending from "./components/NFTTrending";
import NFTCollectionExplore from "./components/NFTCollectionExplore";
import FeaturedArtistsSection from "./components/FeaturedArtistsSection";
import Footer from "./components/Footer";
import styled from "styled-components";

const Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Roboto', sans-serif;
`

function LandingPage(props) {
    return (<Container>
        <NavBar1/>
        <Hero/>
        <Section1/>
        <Section2/>
        <Section3LiveAuction/>
        <NFTTrending/>
        <NFTCollectionExplore/>
        <FeaturedArtistsSection/>
        <Footer landingPage={true}/>
    </Container>);
}

export default LandingPage;