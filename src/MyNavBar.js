import { Container, Nav, Navbar } from "react-bootstrap";


function MyNavBar() {
    return (  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">NFT Marketplace</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {/* <Nav.Link href="/dashboard">Account Dashboard</Nav.Link>   */}
         <Nav.Link href="/mint-tokens">Mint Tokens</Nav.Link>
        <Nav.Link href="/my-nfts">My NFTs</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
}

export default MyNavBar;