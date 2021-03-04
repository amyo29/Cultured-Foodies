import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom';
const countries_data = require("../../data/threeCountries.json")
const news_data = require("../../data/threeNews.json");
const dishes_data = require("../../data/threeDishes.json");

function Country() {
  const { id } = useParams<{ id: string }>();
  let data = countries_data[+id]; 

  let dish = data["dish"];
  let article = data["article"];
  return (
    <Container fluid> 
        <Row>
            <Col>
                <h1>{data["name"]}</h1>
            </Col>
        </Row>
        <Row>
            <Col xs={6} md={4}>
                <Image src={data["flag"]} fluid /> 
            </Col>
        </Row>
        <Row>
            <Col>
                {data["alpha3Code"]}
            </Col>
        </Row>
        
        <Row>
            <Col>
                <h5>Region</h5>
                {data["region"]}
            </Col>
        
            <Col>
                <h5>Time Zones</h5>
                {data["timezones"].map((timezone: any) => {
                return <li>{timezone}</li>
            })}
            </Col>
        
        </Row>
            
                <h5>Population</h5>
                {data["population"]}
            
            
                <h5>Capital city</h5>
                {data["capital"]}
            
        <Row>
         
        </Row>
            <h5>Translations</h5>
        <Row>

        </Row>
          {
            Object.keys(data["translations"]).map(k => {
              return <li>{data["translations"][k]}</li>
          })} 
        <Row>
            
        </Row>   
    </Container>
  );
}

export default Country;
