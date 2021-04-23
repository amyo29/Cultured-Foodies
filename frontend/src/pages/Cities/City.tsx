import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
import NavBarSolid from "../../components/NavBarSolid";
import { CuisineInstance } from "../Cuisines/Cuisine";
import "../../styles/City.css";
import { CardDeck, Carousel, Card, Container } from "react-bootstrap";
import { cpuUsage } from "node:process";

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

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  var i, j;
  var chunk = 3;
  var CuisineRows = [];
  for (i = 0, j = cuisines?.length; i < (j ? j : 0); i += chunk) {
    CuisineRows.push(cuisines?.slice(i, i + chunk));
  }

  return (
    <div>
      <NavBarSolid />
      <img src={city?.imagesweb} className="city-img-top" />
      <h1 className="text-center">{city?.name}</h1>
      <div className="card-columns" style={{ margin: 20 }}>
        <div className="card">
          <div className="card-body align-self-start">
            <h3 className="margin">{city?.full_name}</h3>

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
        <div className="card">
          <h3 className="margin">
            {city?.name}'s Urban Area- Quality of Life Scores
          </h3>
          <div className="my-custom-scrollbar scroll" 
          style={{ width: "40rem", maxHeight: "40rem" }}>
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
                      ? parseFloat(city?.business_freedom.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Cost of Living</td>
                  <td>
                    {city?.cost_of_living
                      ? parseFloat(city?.cost_of_living.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Economy</td>
                  <td>
                    {city?.economy ? parseFloat(city?.economy.toFixed(2)) : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Housing</td>
                  <td>
                    {city?.housing ? parseFloat(city?.housing.toFixed(2)) : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Commute</td>
                  <td>
                    {city?.commute ? parseFloat(city?.commute.toFixed(2)) : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Education</td>
                  <td>
                    {city?.education
                      ? parseFloat(city?.education.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Environmental Quality</td>
                  <td>
                    {city?.environmental_quality
                      ? parseFloat(city?.environmental_quality.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Healthcare</td>
                  <td>
                    {city?.healthcare
                      ? parseFloat(city?.healthcare.toFixed(2))
                      : "No Data"}{" "}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Leisure and Culture</td>
                  <td>
                    {city?.leisure_culture
                      ? parseFloat(city?.leisure_culture.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Outdoors</td>
                  <td>
                    {city?.outdoors
                      ? parseFloat(city?.outdoors.toFixed(2))
                      : "No Data"}{" "}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Safety</td>
                  <td>
                    {city?.safety ? parseFloat(city?.safety.toFixed(2)) : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Startups</td>
                  <td>
                    {city?.safety ? parseFloat(city?.startups.toFixed(2)) : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Taxation</td>
                  <td>
                    {city?.taxation
                      ? parseFloat(city?.taxation.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Tolerance</td>
                  <td>
                    {city?.taxation
                      ? parseFloat(city?.tolerance.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Travel and Connectivity</td>
                  <td>
                    {city?.travel_connectivity
                      ? parseFloat(city?.travel_connectivity.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Internet Access</td>
                  <td>
                    {" "}
                    {city?.internet_access
                      ? parseFloat(city?.internet_access.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
                <tr>
                  <td scope="row">Venture Capital</td>
                  <td>
                    {" "}
                    {city?.venture_capital
                      ? parseFloat(city?.venture_capital.toFixed(2))
                      : "No Data"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <h3 className="margin">Restaurants in {city?.name}</h3>
          <div
            className="my-custom-scrollbar-restaurant scroll"
            style={{ width: "40rem", maxHeight: "34rem" }}
          >
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
      </div>
      <div style={{ margin: 10 }}>
        <Container style={{maxWidth: "90%"}}>
        <h3 className="mt-2">Cuisines of {city?.name}</h3>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            style={{ margin: "25px" }}
          >
            {CuisineRows?.map((cols) => (
              <Carousel.Item>
                <CardDeck>
                  {cols?.map((c: any) => (
                    <a href={"/cuisines/" + c.id} className="card">
                      <h5 className="mt-2">{c.name}</h5>
                      <img
                        src={c.dishes[0].image_url}
                        className="carousel-img"
                      />
                    </a>
                  ))}
                </CardDeck>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
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
  startups: number;
  state: string;
  taxation: number;
  tolerance: number;
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
