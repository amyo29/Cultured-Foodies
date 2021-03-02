import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../../components/Footer";

const data = require('../../data/countries.json').slice(0,3)
function Countries() {
  var i, j;
  var chunk = 5;
  var rows =[] 
  for (i=0,j=data.length; i<j; i+=chunk) {
    rows.push(data.slice(i,i+chunk))
  }
  return (
    <div>
      <header>Countries</header>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((country:any) => (
              <Col>
                <a href={"/countries/" + country['name']}>
                <Card>
                  <Card.Body>
                    <Card.Title>{country['name']}</Card.Title>
                    <Card.Text>{country['capital']}</Card.Text>
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

export default Countries;
