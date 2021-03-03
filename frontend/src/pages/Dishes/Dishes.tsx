import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const afghan_dish = require("../../data/AfghanistanDishes.json");
const albania_dish = require("../../data/AlbaniaDishes.json");
const algeria_dish = require("../../data/AlgeriaDishes.json");

function Dishes() {
  let rows = [
    [{ country: "United States", desc: "hello, Country" }, { fake: 2 }],
    [{ fake: 3 }, { fake: 4 }],
  ];
  //
  return (
    <div>
      <header>Countries</header>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((col) => (
              <Col>
                <Card>
                  {/* <Card.Img variant="top" src={img} /> */}
                  <Card.Body>
                    <Card.Title>{col["country"]}</Card.Title>
                    <Card.Text>{col["desc"]}</Card.Text>
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
