import Button from 'react-bootstrap/Button.js';
import Card from 'react-bootstrap/Card';

function MyCard(props) {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
           price: {props.price}
          </Card.Text>
          <Card.Text>
            {props.description}
          </Card.Text>
          {props.mint? <Button variant="primary" onClick={()=>props.mint()}>mint</Button>:""}
         
        </Card.Body>
      </Card>
    );
  }
  
  export default MyCard;