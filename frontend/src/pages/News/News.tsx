import React, {useEffect} from "react";
import { Table } from "react-bootstrap";
import "../../styles/News.css";
const data = require("../../data/threeNews.json");
const countries_data = require("../../data/threeCountries.json");

function News() {
  useEffect(() => {
    document.title = "News Article"
  }, [])
  return (
    <div>
      <h1 className="text-align center">News</h1>
      <Table responsive className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Country</th>
            <th>Language</th>
            <th>Author</th>
            <th>Published Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((article: any, i: any) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                <a href={"/news/" + i} className="article">{article["title"]}</a>
              </td>
              <td>{countries_data[article["countryIndex"]]["name"]}</td>
              <td>{article["language"]}</td>
              <td>{article["author"]}</td>
              <td>{article["published_date"]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default News;
