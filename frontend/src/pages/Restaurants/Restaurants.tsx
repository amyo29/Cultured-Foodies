import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../styles/Restaurants.css";
// const data = require("../../data/threeNews.json");
// const countries_data = require("../../data/threeCountries.json");
const data = require("../../data/newData/threeRestaurants.json");

function Restaurants() {
  useEffect(() => {
    document.title = "Restaurants";
  }, []);
  return (
    <div>
      <h1 className="text-align center">Restaurants</h1>
      <Table responsive className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>Rating</th>
            <th>Price Range</th>
            <th>Average Cost for Two</th>
          </tr>
        </thead>
        <tbody>
          {data.map((restaurant: any, i: any) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                <a href={"/restaurants/" + i} className="article">
                  {restaurant["name"]}
                </a>
              </td>
              <td>{restaurant["location"]["city"]}</td>
              <td>{restaurant["user_rating"]["aggregate_rating"]}</td>
              <td>{restaurant["price_range"]}</td>
              <td>${restaurant["average_cost_for_two"]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Restaurants;
