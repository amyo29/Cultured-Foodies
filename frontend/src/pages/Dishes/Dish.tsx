import React from "react";
import { Jumbotron } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
const dishes_data = require("../../data/threeDishes.json")

function Dish() {
  const { id } = useParams<{ id: string }>();
  let data = dishes_data[+id]
  return (
    <Container fluid> 
        <Row>
            <Col>
                <h1>{data["recipe"]["label"]}</h1>
            </Col>
        </Row>
        <Row>
            <Col xs={6} md={4}>
                <Image src={data["recipe"]["image"]} fluid />
            </Col>
        </Row>
        <Row>
            <Col>
                {data["recipe"]["source"]}
            </Col>
        </Row>
        
        <Row>
            <Col>
                <h5>Dietary</h5>
            </Col>
            <Col>
                <h5>Health</h5>
            </Col>
        </Row>
        <Row>
            <Col>
                {data["recipe"]["dietLabels"]}
            </Col>
            <Col>
                {data["recipe"]["healthLabels"][0]}
                {data["recipe"]["healthLabels"][1]}
                {data["recipe"]["healthLabels"][2]}
            </Col>
        </Row>
        
        <Row>
            <Col>
                <h5>Restrictions</h5>
            </Col>
            <Col>
                <h5>Calories</h5>
            </Col>
        </Row>
        <Row>
            <Col>
                {data["recipe"]["cautions"]}
            </Col>
            <Col>
                {data["recipe"]["calories"]}
            </Col>
        </Row>
            <h5>Ingredients</h5>
        <Row>

        </Row>
            {data["recipe"]["ingredientLines"].map((ingredient: any) => {
                return <li>{ingredient}</li>
            })}
        <Row>
            
        </Row>
    </Container>
  );
}

export default Dish;
