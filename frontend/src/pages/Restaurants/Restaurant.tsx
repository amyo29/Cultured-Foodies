import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Restaurant.css";
import Card from "react-bootstrap/Card";
import useAxios from "axios-hooks";
import axios from "axios";
import { CuisineInstance } from "../Cuisines/Cuisine";
import { CityInstance } from "../Cities/City";
function Restaurant(id: any) {
  useEffect(() => {
    document.title = "Restaurant";
  }, []);
  const [{ data, loading, error }] = useAxios("/api/restaurants/id=" + id.id);
  const [restaurant, setRestaurant] = useState<RestaurantInstance>();
  console.log("here", id);
  useEffect(() => {
    const restaurantObj: RestaurantInstance = data as RestaurantInstance;
    if (restaurantObj) {
      setRestaurant(restaurantObj);
    }
  }, [data]);

  //render: map long/lat or city names to render map
  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8";
  let cityMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    API_KEY +
    "&q=" +
    restaurant?.name.replace("&", "%20");


  return (

    <div>
      <body className="Instance center-div">
        <h2 className="Instance-header">{restaurant?.name}</h2>
        <div className="info" align-items="center">
          <div className="row">
            <div className="col">
              <img
                src={restaurant?.restaurant_image}
                alt=""
                width="450"
              />
            </div>
            <div className="col">
            <Card className="instance-text" style={{ width: "55rem" }}>
              <Card.Body>
                <Card.Title>{restaurant?.name}</Card.Title>
                <Card.Text>Phone Number: {restaurant?.phone_numbers}</Card.Text>
                <Card.Text>Address: {restaurant?.address}</Card.Text>
                <Card.Text>City: {restaurant?.city}</Card.Text>
                <Card.Text>Zipcode: {restaurant?.zipcode}</Card.Text>
                <Card.Text>
                  Average Rating: {restaurant?.aggregate_rating}
                </Card.Text>
                <Card.Text>Highlights: {restaurant?.highlights}</Card.Text>
                <Card.Text>Price Range: {restaurant?.price_range}</Card.Text>
                <Card.Text>Average Cost for Two: ${restaurant?.average_cost_for_two}</Card.Text>
                <Card.Text>Timings: {restaurant?.timings}</Card.Text>
                <Card.Text>
                  Menu: 
                  {
                    <a href={restaurant?.menu_url}>
                      {" "} 
                      {restaurant?.menu_url}
                      <br />
                    </a>
                  }
                </Card.Text>
                <Card.Text>
                  Cities which have this restaurant:
                  {
                    <a href={"/cities/" + restaurant?.city_id}>
                      {" "}
                      {restaurant?.city}
                      <br />
                    </a>
                  }
                </Card.Text>
                Cuisines for this restaurant: <br />
                {restaurant?.cuisines ? (
                  restaurant?.cuisines?.split(", ").map((c, index) =>
                    restaurant?.cuisine_ids.split(", ")[index] !== "-1" ? (
                      <a
                        href={
                          "/cuisines/" +
                          restaurant?.cuisine_ids.split(", ")[index]
                        }
                      >
                        {c}
                        <br />
                      </a>
                    ) : (
                      <a>
                        {c}
                        <br />
                      </a>
                    )
                  )
                ) : (
                  <p>loading</p>
                )}
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
            </div>
          </div>
        </div>
      </body>
      <div className="center">
        <h4>Map Location</h4>
        <iframe
          src={cityMapURL}
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
    
  );
}

export interface RestaurantObject {
  restaurants: RestaurantInstance[];
}
export interface RestaurantInstance {
  address: string;
  aggregate_rating: string;
  average_cost_for_two: number;
  city: string;
  cuisines: string;
  highlights: string;
  id: number;
  latitude: string;
  longitude: string;
  menu_url: string;
  name: string;
  phone_numbers: string;
  price_range: number;
  restaurant_image: string;
  state_abbrev: string;
  timings: string;
  url: string;
  zipcode: string;
  city_id: string;
  cuisine_ids: string;
}
export default Restaurant;
