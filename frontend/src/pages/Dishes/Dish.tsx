import React, {useEffect} from "react";
import { Jumbotron } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
const dishes_data = require("../../data/threeDishes.json");
const countries_data = require("../../data/threeCountries.json");
const news_data = require("../../data/threeNews.json");

function Dish() {
  useEffect(() => {
    document.title = "Dish"
  }, [])
  const { id } = useParams<{ id: string }>();
  let data = dishes_data[+id];
  let countryIndex = data["countryIndex"];
  let newsIndex = data["newsIndex"];
  let youTubeID = data["youTubeLinkID"];

  let country = countries_data[countryIndex];
  let article = news_data[newsIndex];
  let youTubeURL = "https://www.youtube.com/embed/" + youTubeID;

  return (
    <Container fluid>
      <h1>{data["recipe"]["label"]}</h1>

      <section>
        <h5>Dietary</h5>
        {data["recipe"]["dietLabels"].length == 0
          ? "No dietary labels"
          : data["recipe"]["dietLabels"]}

        <h5>Health</h5>
        {data["recipe"]["healthLabels"].map((healthLabel: any) => {
          return <li>{healthLabel}</li>;
        })}
      </section>

      <Image src={data["recipe"]["image"]} fluid />

      <p>{data["recipe"]["source"]}</p>

      <h5>Calories</h5>
      {data["recipe"]["calories"]}

      <p>
        <h5>Ingredients</h5>
        {data["recipe"]["ingredientLines"].map((ingredient: any) => {
          return <li>{ingredient}</li>;
        })}
      </p>

      <h5>Restrictions</h5>
      {data["recipe"]["cautions"].length == 0
        ? "No restrictions"
        : data["recipe"]["cautions"].map((caution: any) => {
            return <li>{caution}</li>;
          })
      }

      <h5>Country: </h5>
      <a href={"/countries/" + countryIndex}>{country["name"]}</a>

      <h5>Mentioned in news articles: </h5>
      <a href={"/news/" + newsIndex}>{article["title"]}</a>
      <br />

      <div className="center">
        <h3>Recipe video</h3>
        <iframe
          src={youTubeURL}
          width="50%"
          height="400"
          allow="fullscreen"
          title="video"
        />
      </div>
    </Container>
  );
}

export default Dish;
