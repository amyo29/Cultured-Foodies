import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

// const data = require('../../data/countries.json').slice(0,3)
const data = require('../../data/threeCountries.json')
function Countries() {
  var i, j;
  var chunk = 5;
  var rows =[] 
  for (i=0,j=data.length; i<j; i+=chunk) {
    rows.push(data.slice(i,i+chunk))
  }
  console.log(JSON.stringify(rows[0][0]))
  // a country will be at rows[index][index]
  return (
    <div>
      <header>Countries</header>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((country:any, i :any) => (
              <Col>
                <a href={"/countries/" +i}>
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
