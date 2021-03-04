import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
const countries_data = require("../../data/threeCountries.json");
const news_data = require("../../data/threeNews.json");
const dishes_data = require("../../data/threeDishes.json");

function Country() {
  const { id } = useParams<{ id: string }>();
  let data = countries_data[+id];
  let countryName = data["name"]

  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8"
  let countryMapURL = "https://www.google.com/maps/embed/v1/place?key=" + API_KEY + "&q=" + countryName

  let dishIndex = data["dishIndex"];
  let newsIndex = data["newsIndex"];
  let dishName = dishes_data[dishIndex]["recipe"]["label"];
  let newsArticle = news_data[newsIndex]["title"];
  let newsLink = news_data[newsIndex];

  console.log(newsLink);
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
        <Col>{data["alpha3Code"]}</Col>
      </Row>

      <Row>
        <Col>
          <h5>Region</h5>
          {data["region"]}
        </Col>

        <Col>
          <h5>Time Zones</h5>
          {data["timezones"].map((timezone: any) => {
            return <li>{timezone}</li>;
          })}
        </Col>
      </Row>

      <h5>Population</h5>
      {data["population"]}

      <h5>Capital city</h5>
      {data["capital"]}

      <Row></Row>
      <h5>Translations</h5>
      <Row></Row>
      {Object.keys(data["translations"]).map((k) => {
        return <li>{data["translations"][k]}</li>;
      })}
      <Row></Row>
      <h5>Dishes from this country:</h5>
      <a href={"/dishes/" + dishIndex}>
        <h6>{dishName}</h6>
      </a>
      <Row></Row>

      <Row></Row>
      <h5>News articles:</h5>
      <a href={"/news/" + newsIndex}>
        <h6>{newsArticle}</h6>
      </a>
      <Row></Row>

      <iframe
        src={countryMapURL}
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </Container>
  );
}

export default Country;
