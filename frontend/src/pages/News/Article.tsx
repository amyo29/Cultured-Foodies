import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/Article.css";

const news_data = require("../../data/threeNews.json");
const countries_data = require("../../data/threeCountries.json");
const dishes_data = require("../../data/threeDishes.json");

function Article() {
  const { id } = useParams<{ id: string }>();

  let article = news_data[+id];

  // model navigation
  let countryIndex = article["countryIndex"];
  let dishIndex = article["dishIndex"];

  let country = countries_data[countryIndex]["name"];
  let countryFlag = countries_data[countryIndex]["flag"];

  let dishName = dishes_data[dishIndex]["recipe"]["label"]

  // attributes and media
  let img = article["media"];
  let title = article["title"];
  let language = article["language"];
  let author = article["author"];
  let publishedDate = article["published_date"];
  let summmary = article["summary"];
  let link = article["link"];

  return (
    <div>
      <img src={img} className="article-img"></img>
      <h1>{title}</h1>
      <h4>Author: {author}</h4>
      <p>Published: {publishedDate}</p>
      <a href={"/dishes/" + dishIndex}>
        <h5>Associated Dish: {dishName}</h5>
      </a>
      <a href={"/countries/" + countryIndex}>
        <img src={countryFlag} className="flag-img"></img>
        <h5>{country}</h5>
      </a>
      <h5>Language: {language}</h5>
      <h4>{summmary}</h4>
      <a href={link}>
        <h6>Link to the article</h6>
      </a>
    </div>
  );
}

export default Article;
