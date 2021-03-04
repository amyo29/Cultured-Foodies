import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../../components/Footer";

const data  = require('../../data/threeDishes.json')
function Dishes() {

  var i, j;
  var chunk = 5;
  var rows =[] 
  for (i=0,j=data.length; i<j; i+=chunk) {
    rows.push(data.slice(i,i+chunk))
  }
  return (
    <div>
      <h1>Dishes</h1>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((col: any, i: any) => (
              <Col>
              {/* <a href= {"/dishes/"+ col["recipe"]["label"]}> */}
             <a href = {"/dishes/" + i}>
                <Card>
                  {/* <Card.Img variant="top" src={img} /> */}
                  <Card.Body>
                    <Card.Text>{col["recipe"]["label"]}</Card.Text>
                  </Card.Body>
                </Card>
                </a>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default Dishes;
