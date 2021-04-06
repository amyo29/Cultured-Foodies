import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import "../../styles/Restaurants.css";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
// import { MDBDataTable } from 'mdbreact';
import logo from "../../static_resources/dumpling.gif";
import small from "../../static_resources/smaller dumpling.gif";
import {RestaurantObject, RestaurantInstance } from './Restaurant'

function Restaurants() {
  useEffect(() => {
    document.title = "Restaurants";
  }, []);

  const [restaurants, setRestaurants] = useState<Array<RestaurantInstance>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayedRestuarants, setDisplayedRestaurants] = useState<Array<RestaurantInstance>>([]);

  const [loaded, changeLoading] = useState(false);
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios("/api/restaurants");

  useEffect(() => {
    if (data) {
      const restauarantObj: RestaurantObject = data as RestaurantObject;
      setRestaurants(data.restaurants);   
      setDisplayedRestaurants(data.restaurants)
      changeLoading(true);
    }
  }, [data]);

  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber-1);
  const currentData = displayedRestuarants.slice(startIndex, startIndex + numPerPage);
  let onSort = (sortableField: string, ascending: boolean) => {
    console.log(sortableField)
    var copy = restaurants.slice(0);
    copy.sort(function (a: any, b: any) {
      if (ascending){
        return a[sortableField] > b[sortableField]? 1: -1;
      } else {
        return a[sortableField] >  b[sortableField]? -1: 1;
      }
    });

    setDisplayedRestaurants(copy)
  }
  let tabledata_row = []

  const tabledata = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      // {
      //   label: 'Position',
      //   field: 'position',
      //   sort: 'asc',
      //   width: 270
      // },
      // {
      //   label: 'Office',
      //   field: 'office',
      //   sort: 'asc',
      //   width: 200
      // },
      // {
      //   label: 'Age',
      //   field: 'age',
      //   sort: 'asc',
      //   width: 100
      // },
      // {
      //   label: 'Start date',
      //   field: 'date',
      //   sort: 'asc',
      //   width: 150
      // },
      // {
      //   label: 'Salary',
      //   field: 'salary',
      //   sort: 'asc',
      //   width: 100
      // }
    ],
    rows: restaurants
    // rows: restaurants.map((r)=> { return {'name':<a href={'/restaurants/' +r.id}>{r.name}</a>}; })
  };
  if (loaded) {
  return (
    
    <div>
      <Row className="justify-content-md-center" style={{
        margin: 25
      }}>
      <Col md={3}>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={small} alt="loading..."/>
        </div>
      </Col>
      
      <Col md={3}>
      <h1 className="text-align center" style={{
        margin: 25,
      }}>Restaurants</h1>
        </Col>
      
        <Col md={3}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={small} alt="loading..."/>
        </div>
      </Col>
      </Row>
      
      <Table responsive className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th><button  onClick={ () => onSort('id', true)}>#</button></th>
            <th><button  onClick={ () => onSort('name', true)}>Name</button></th>
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
        
    {/* <MDBDataTable
      striped
      bordered
      small
      data={tabledata}
    /> */}
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

  else { 
    return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <img src={logo} alt="loading..."/>
    </div>
  )
  }
}

export default Restaurants;
