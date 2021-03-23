import React, {useEffect} from "react";
import { Container, Row, Col, Card, Navbar } from "react-bootstrap";

// const data = require('../../data/countries.json').slice(0,3)
// const data = require('../../data/threeCountries.json')
const data = require('../../data/newData/cuisines.json')
const countries_data = require('../../data/newData/countries.json')

function Countries() {
  useEffect(() => {
    document.title = "Cuisines"
  }, [])
  var i, j;
  var chunk = 5;
  var rows =[] 
  for (i=0,j=data.length; i<j; i+=chunk) {
    rows.push(data.slice(i,i+chunk))
  }
  console.log(JSON.stringify(rows[0][0]))
  // a cuisine will be at rows[index][index]
  return (
    <div>
      <h1 className="text-align center">Cuisines</h1>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((cuisine:any, i :any) => (
              <Col className="col-sm-4 py-2">
                <Card bg='card light h-100'>
                  <Card.Body>
                      <a href={"/cuisines/" + i}>
                        <Card.Title>{cuisine['name']}</Card.Title>
                      </a>
                    <Card.Img variant="top" src={cuisine['dishes'][0]['image_url']}/>
                    <Card.Text>
                      <p>
                        <b>Country: </b>{cuisine['country']} <br />
                        <b>Capital: </b>{countries_data[i]['capital']} <br />
                        <b>Region: </b>{countries_data[i]['region']} <br />
                        <b>Population: </b>{countries_data[i]['population']} <br />
                        <b>Latitude: </b>{countries_data[i]['latlng'][0]} <br />
                        <b>Longitude: </b>{countries_data[i]['latlng'][1]} <br />
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
