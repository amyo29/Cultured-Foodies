import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
function Countries() {
  let rows = [
    [{ "country" :"United States", "desc": "hello, Country", "id":"fake_id"}, { fake: 2 }],
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
                <a href={"/countries/" + col['id']}>
                <Card>
                  {/* <Card.Img variant="top" src={img} /> */}
                  <Card.Body>
                    <Card.Title>{col['country']}</Card.Title>
                    <Card.Text>{col['desc']}</Card.Text>
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
