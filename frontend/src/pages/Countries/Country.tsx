import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import "../../styles/Country.css";

const countries_data = require("../../data/threeCountries.json");
const news_data = require("../../data/threeNews.json");
const dishes_data = require("../../data/threeDishes.json");

function Country() {
  const { id } = useParams<{ id: string }>();
  let data = countries_data[+id];
  let countryName = data["name"];

  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8";
  let countryMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    API_KEY +
    "&q=" +
    countryName;

  let dishIndex = data["dishIndex"];
  let newsIndex = data["newsIndex"];
  let dishName = dishes_data[dishIndex]["recipe"]["label"];
  let newsArticle = news_data[newsIndex]["title"];
  let newsLink = news_data[newsIndex];

  console.log(newsLink);
  return (
    <Container fluid>
      <header>
        <h1>{data["name"]}</h1>
      </header>

      <p></p>
      <Row>
        <Col xs={6} md={4}>
          <Image src={data["flag"]} fluid />
        </Col>
      </Row>
      <section>
        <h5>Alpha 3 Code:</h5>
        {data["alpha3Code"]}

        <h5>Region</h5>
        {data["region"]}

        <h5>Subegion</h5>
        {data["subregion"]}
      </section>

      <h5>Population</h5>
      {data["population"].toLocaleString("en", { useGrouping: true })}

      <h5>Capital city</h5>
      {data["capital"]}

      <h5>Bordering Countries</h5>
      {data["borders"].length? data["borders"].map((timezone: any) => {
          return <li>{timezone}</li>;
        }) : "No bordering countries"}

      <section>
        <h5>Time Zones</h5>
        {data["timezones"].map((timezone: any) => {
          return <li>{timezone}</li>;
        })}
      </section>

      <h5>Translations</h5>

      {Object.keys(data["translations"]).map((k) => {
        return <li>{data["translations"][k]}</li>;
      })}

      <p></p>
      <p></p>
      <p></p>
      <p></p>

      <h5>Dishes from this country:</h5>
      <a href={"/dishes/" + dishIndex}>
        <h6>{dishName}</h6>
      </a>

      <h5>News articles:</h5>
      <a href={"/news/" + newsIndex}>
        <h6>{newsArticle}</h6>
      </a>

      <div className="center">
        <h4>Map Location</h4>
        <iframe
          src={countryMapURL}
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </Container>
  );
}

export default Country;
