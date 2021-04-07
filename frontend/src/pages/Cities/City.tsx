import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import axios from "axios";
import { RestaurantInstance } from "../Restaurants/Restaurant";
import { CuisineInstance } from "../Cuisines/Cuisine";
import "../../styles/City.css";

function City(id: any) {
  useEffect(() => {
    document.title = "City";
  }, []);
  const [{ data, loading, error }] = useAxios("/api/cities/id=" + id.id);
  const [city, setCity] = useState<CityInstance>();
  // const [restaurants, setRestaurants] = useState<Array<RestaurantInstance>>();
  const [cuisines, setCuisines] = useState<Array<CuisineInstance>>();

  /* set city data */
  function matchesCityCuisines(element: any, index: number, array: any) {
    return city?.cuisine_ids.split(", ").includes(element?.id.toString());
  }
  // function matchesCityRestaurants(element: any, index: number, array: any) {
  //   return city?.restaurant_ids.split(", ").includes(element?.id.toString());
  // }
  useEffect(() => {
    const cityObj: CityInstance = data as CityInstance;
    if (cityObj) {
      setCity(cityObj);
    }
  }, [data]);

  useEffect(() => {
    axios.get("/api/cuisines").then((value) => {
      let all_cuisines = value["data"]["cuisines"];
      let filtered_cuisines = all_cuisines.filter(matchesCityCuisines);
      setCuisines(filtered_cuisines);
    });
  }, [city]);
  console.log(city);

  //render: map long/lat or city names to render map
  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8";
  let cityMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    API_KEY +
    "&q=" +
    city?.full_name;

  return (
    <div>
      <img src={city?.imagesweb} className="city-img-top" />
      <h1 className="text-center">{city?.name}</h1>
      <div className="row m-0">
        <div className="col margin">
          <div className="card">
            <div className="card-body align-self-start">
              <h3>{city?.full_name}</h3>

              <h5>Summary</h5>
              <p>{city?.summary.replace(/(<([^>]+)>)/gi, "")}</p>

              <h5>State</h5>
              <p>{city?.state}</p>

              <h5>Population</h5>
              <p>{city?.population.toLocaleString()}</p>

              <h5>Location</h5>
              <h6>Latitude</h6>
              <p>
                {city?.latitude}
                <h6>Longitude</h6>
                {city?.longitude}
              </p>

              <h5>Timezone</h5>
              <p>{city?.timezone}</p>
            </div>
          </div>
        </div>
        <div className="col margin">
          <div className="card">
            <div className="card-body">
              <h3>{city?.name}'s Urban Area- Quality of Life Scores</h3>
              <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-bordered table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Attribute</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">Business Freedom</td>
                      <td>
                        {city?.business_freedom
                          ? parseFloat(city?.business_freedom.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Cost of Living</td>
                      <td>
                        {city?.cost_of_living
                          ? parseFloat(city?.cost_of_living.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Economy</td>
                      <td>
                        {city?.economy
                          ? parseFloat(city?.economy.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Housing</td>
                      <td>
                        {city?.housing
                          ? parseFloat(city?.housing.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Commute</td>
                      <td>
                        {city?.commute
                          ? parseFloat(city?.commute.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Education</td>
                      <td>
                        {city?.education
                          ? parseFloat(city?.education.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Environmental Quality</td>
                      <td>
                        {city?.environmental_quality
                          ? parseFloat(city?.environmental_quality.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Healthcare</td>
                      <td>
                        {city?.healthcare
                          ? parseFloat(city?.healthcare.toFixed(4))
                          : " "}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Leisure and Culture</td>
                      <td>
                        {city?.leisure_culture
                          ? parseFloat(city?.leisure_culture.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Outdoors</td>
                      <td>
                        {city?.outdoors
                          ? parseFloat(city?.outdoors.toFixed(4))
                          : " "}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Safety</td>
                      <td>
                        {city?.safety
                          ? parseFloat(city?.safety.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Taxation</td>
                      <td>
                        {city?.taxation
                          ? parseFloat(city?.taxation.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Travel and Connectivity</td>
                      <td>
                        {city?.travel_connectivity
                          ? parseFloat(city?.travel_connectivity.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Internet Access</td>
                      <td>
                        {" "}
                        {city?.internet_access
                          ? parseFloat(city?.internet_access.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">Venture Capital</td>
                      <td>
                        {" "}
                        {city?.venture_capital
                          ? parseFloat(city?.venture_capital.toFixed(4))
                          : " "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ width: "40rem", maxHeight: "40rem" }}>
        <h3 className="margin">Restaurants in {city?.name}</h3>
        <div className="table-wrapper-scroll-y my-custom-scrollbar-restaurant">
          <table className="table table-bordered table-hover mb-0">
            <tbody>
              {city?.restaurants ? (
                city?.restaurants?.split(", ").map((r, index) => (
                  <>
                    <tr>
                      <td scope="row">
                        <a
                          href={
                            "/restaurants/" +
                            city?.restaurant_ids.split(", ")[index]
                          }
                          target="_blank"
                        >
                          {r}
                          <br />
                        </a>
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <p>loading</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h5>Cuisines of {city?.name}</h5>
        {cuisines?.map((c) => (
          <a href={"/cuisines/" + c.id}>
            {c.name}
            <br />{" "}
            <img src={c.dishes[0].image_url} width="200" height="200"></img>
          </a>
        ))}
      </div>

      <div className="center">
        <h2>Map Location</h2>
        <div className="map-responsive">
          <iframe
            src={cityMapURL}
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export interface CityObject {
  cities: CityInstance[];
}

export interface CityInstance {
  business_freedom: number;
  commute: number;
  cost_of_living: number;
  economy: number;
  education: number;
  environmental_quality: number;
  full_name: string;
  healthcare: number;
  housing: number;
  id: number;
  imagesmobile: string;
  imagesweb: string;
  internet_access: number;
  latitude: number;
  leisure_culture: number;
  longitude: number;
  name: string;
  outdoors: number;
  population: number;
  safety: number;
  state: string;
  taxation: number;
  timezone: string;
  travel_connectivity: number;
  venture_capital: number;
  summary: string;
  cuisine_ids: string;
  restaurant_ids: string;
  cuisines: string;
  restaurants: string;
}

export default City;
