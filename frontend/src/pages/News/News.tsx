import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../../styles/News.css";
const data = require("../../data/threeNews.json");

function News() {
  return (
    <div>
      <h1>News</h1>
      <ListGroup>
        Title | Country | Language | Author | Published Date
        {data.map((article: any, i: any) => (
          <a href={"/news/" + i}>
            <ListGroupItem className="nounderline">
              {article["title"]} | {article["country"]} | {article["language"]}{" "}
              | {article["author"]} | {article["published_date"]}
            </ListGroupItem>
          </a>
        ))}
      </ListGroup>
    </div>
  );
}

export default News;
