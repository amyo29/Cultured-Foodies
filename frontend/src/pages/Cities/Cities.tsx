import React, {useEffect} from "react";
import { Container, Row, Col, Card, ListGroup, Navbar } from "react-bootstrap";
import Footer from "../../components/Footer";

// const data = require("../../data/threeDishes.json");
const data = require("../../data/newData/threeCities.json");

function Cities() {
  useEffect(() => {
    document.title = "Cities"
  }, [])
  var i, j;
  var chunk = 5;
  var rows = [];
  for (i = 0, j = data.length; i < j; i += chunk) {
    rows.push(data.slice(i, i + chunk));
  }
  return (
    <div>
      <h1 className="text-align center">Cities</h1>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((col: any, i: any) => (
              <Col className = "col-sm-4 py-2">
                <Card bg='card h-100'>
                  <Card.Body>
                    <a href= {"/cities/"+ i}><Card.Title>{col["name"]}</Card.Title></a>
                    <Card.Img variant="top" src={col["images"]["mobile"]} />
                      <p>
                        <b>State: </b> {col["state"]} <br />
                        <b>Population: </b> {col["population"]} <br />
                        <b>Latitude: </b> {col["latitude"]} <br />
                        <b>Longitude: </b> {col["longitude"]} <br />
                        <b>Timezone: </b> {col["timezone"]} <br />
                      </p>
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

export default Cities;
