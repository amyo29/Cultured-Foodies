import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import "../../styles/Restaurants.css";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";

import logo from "../../static_resources/spinny.gif";

function Restaurants() {
  useEffect(() => {
    document.title = "Restaurants";
  }, []);

  const [restaurants, setRestaurants] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loaded, changeLoading] = useState(false);
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios("/api/restaurants");

  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants);   
      changeLoading(true);
    }
  }, [data]);

  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber-1);
  const currentData = restaurants.slice(startIndex, startIndex + numPerPage);

  return (
    <div>
      <h1 className="model text-align center">Restaurants</h1>
      {
        loaded ? (
      <Table responsive className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>Cuisines</th>
            <th>Rating</th>
            <th>Price Range</th>
            <th>Average Cost for Two</th>
          </tr>
        </thead>
          <tbody>
          {currentData.map((restaurant: any, i: any) => (
            <tr>
              <td>{startIndex + i + 1}</td>
              <td>
                <a
                  href={"/restaurants/" + restaurant["id"]}
                  className="article"
                >
                  {restaurant["name"]}
                </a>
              </td>
              <td>{restaurant["city"]}</td>
              <td>{restaurant["cuisines"]}</td>
              <td>{restaurant["aggregate_rating"]}</td>
              <td>{restaurant["price_range"]}</td>
              <td>${restaurant["average_cost_for_two"]}</td>
            </tr>
          ))}
        </tbody>
        
      </Table>
        )
        : 
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 40
        }}>
          <img src={logo} alt="loading..."/>
        </div>
      }  

      <div className="row pagination">
      <Pagination   
        count={Math.ceil(restaurants.length / numPerPage )}
        page={pageNumber}
        onChange={handleChange}
      ></Pagination>
      {startIndex+1 } - {Math.min(startIndex + numPerPage, restaurants?.length)} of {restaurants?.length}
      </div>
    </div>
  );
}

export default Restaurants;
