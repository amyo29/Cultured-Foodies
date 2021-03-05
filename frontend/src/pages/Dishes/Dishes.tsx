import React from "react";
import { Container, Row, Col, Card, ListGroup, Navbar } from "react-bootstrap";
import Footer from "../../components/Footer";

const data = require("../../data/threeDishes.json");
function Dishes() {
  var i, j;
  var chunk = 5;
  var rows = [];
  for (i = 0, j = data.length; i < j; i += chunk) {
    rows.push(data.slice(i, i + chunk));
  }
  return (
    <div>
      <h1>Dishes</h1>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((col: any, i: any) => (
              <Col>
                <Card bg='light'>
                  <Card.Body>
                    <a href= {"/dishes/"+ i}><Card.Title>{col["recipe"]["label"]}</Card.Title></a>
                    <Card.Img variant="top" src={col["recipe"]["image"]} />
                    <Card.Body>
                      <p>
                        <b>Meal Type: </b> {col["recipe"]["mealType"]} <br />
                        <b>Dish Type: </b> {col["recipe"]["dishType"]} <br />
                        <b>Cuisine Type: </b> {col["recipe"]["cuisineType"]} <br />
                        <b>Health Label: </b> {col["recipe"]["healthLabels"][0]} <br />
                        <b>Source: </b> {col["recipe"]["source"]} <br />
                      </p>
                    </Card.Body>
                    
                    
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

export default Dishes;
