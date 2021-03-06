import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import "../../styles/Article.css";

const news_data = require("../../data/threeNews.json");
const countries_data = require("../../data/threeCountries.json");
const dishes_data = require("../../data/threeDishes.json");

function Article() {
  useEffect(() => {
    document.title = "News Article"
  }, [])
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
  let authorImage = article["authorimage"];
  let title = article["title"];
  let language = article["language"];
  let author = article["author"];
  let publishedDate = article["published_date"];
  let summmary = article["summary"];
  let link = article["link"];
  let source = article["clean_url"]
  let topic = article["topic"]

  return (
    <div className="center">
      <img src={img} className="article-img"></img>
      <h1>{title}</h1>
     
      <p>
      Language: {language} <br/>
        Published: {publishedDate} <br/>
      News source: {source}<br/></p>
     
      <a href={"/dishes/" + dishIndex}>
        <h5>Associated Dish: {dishName}</h5>
      </a>
      <a href={"/countries/" + countryIndex}>
        <img src={countryFlag} className="flag-img"></img>
        <h5>Dish's Origin: {country}</h5>
      </a>
      <div className="center">
      <h4>{summmary}</h4>
      <a href={link} target="_blank">
        <h5>Link to the article</h5>
      </a>
      <h4>Author: {author}</h4>
      <img src={authorImage} className="author-img center"></img>
      </div>
    </div>
  );
}

export default Article;
