import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../../components/Footer";

const afghan_dish = require("../../data/AfghanistanDishes.json")["hits"].slice(0,3);
const albania_dish = require("../../data/AlbaniaDishes.json")["hits"].slice(0, 3);
const algeria_dish = require("../../data/AlgeriaDishes.json")["hits"].slice(0,3);

function Dishes() {
  var rows = [[afghan_dish], [albania_dish], [algeria_dish]].reduce(
    (accum, el) => accum.concat(el),
    []
  );
  return (
    <div>
      <header>Countries</header>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((col: any) => (
              <Col>
              <a href= {"/dishes/"+ col["recipe"]["label"]}>
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
