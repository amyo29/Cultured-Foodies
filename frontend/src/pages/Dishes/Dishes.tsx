import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
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
                {/* <a href= {"/dishes/"+ col["recipe"]["label"]}> */}
                <a href={"/dishes/" + i}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{col["recipe"]["label"]}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {col["recipe"]["mealType"]}
                      </Card.Subtitle>
                      <Card.Img variant="top" src={col["recipe"]["image"]} />
                      <ListGroup variant="flush">
                        <ListGroup.Item>Calories: {col['recipe']['calories']}</ListGroup.Item>
                        <ListGroup.Item>Source: {col['recipe']['source']}</ListGroup.Item>
                      </ListGroup>
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
