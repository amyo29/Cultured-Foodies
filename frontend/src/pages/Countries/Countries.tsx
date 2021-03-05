import React from "react";
import { Container, Row, Col, Card, Navbar } from "react-bootstrap";

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
      <h1>Countries</h1>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((country:any, i :any) => (
              <Col>
                <Card bg='light'>
                  <Card.Body>
                      <a href={"/countries/" + i}>
                        <Card.Title>{country['name']}</Card.Title>
                      </a>
                    <Card.Img variant="top" src={country['flag']}/>
                    <Card.Text>
                      <p>
                        <b>Capital: </b>{country['capital']} <br />
                        <b>Population: </b>{country['population']} <br />
                        <b>Region: </b>{country['region']} <br />
                        <b>Lat°Lon': </b>{country['latlng'][0]}°{country['latlng'][1]}'<br />
                        <b>Size (sq km): </b>{country['area']} <br />
                      </p>
                    </Card.Text>
                    <Card.Text>
  
                    </Card.Text>
                  </Card.Body>
                </Card>

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
