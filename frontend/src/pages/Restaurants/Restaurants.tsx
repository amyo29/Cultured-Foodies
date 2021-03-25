import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../../styles/Restaurants.css";
import useAxios from 'axios-hooks'
import { Pagination } from '@material-ui/lab';

function Restaurants() {
  useEffect(() => {
    document.title = "Restaurants";
  }, []);

  const [restaurants, setResetaurants] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const handleChange = (event:any, value:number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios('/api/restaurants')

  useEffect(() => {
    if (data) {
      setResetaurants(data.restaurants)
    }
  },[data])


  const numPerPage = 12;
  const startIndex= numPerPage*pageNumber;
  const currentData = restaurants.slice(startIndex, startIndex+numPerPage);

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
          {currentData.map((restaurant: any, i: any) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                <a href={"/restaurants/" + restaurant['id']} className="article">
                  {restaurant["name"]}
                </a>
              </td>
              <td>{restaurant["city"]}</td>
              <td>{restaurant["aggregate_rating"]}</td>
              <td>{restaurant["price_range"]}</td>
              <td>${restaurant["average_cost_for_two"]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination count = {parseInt((restaurants.length/numPerPage)+"")} page={pageNumber} onChange={handleChange}></Pagination>

    </div>
  );
}

export default Restaurants;
