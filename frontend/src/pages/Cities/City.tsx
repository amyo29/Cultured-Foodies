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
      <Image src={city?.imagesweb} fluid />
      <Container>
        <h1>{city?.name}</h1>

        <section>
          <h2>About the City</h2>
          {city?.full_name}

          <h5>Summary</h5>
          {city?.summary.replace(/(<([^>]+)>)/gi, "")}

          <h5>State</h5>
          {city?.state}

          <h5>Population</h5>
          {city?.population.toLocaleString()}

          <h5>Location</h5>
          <h6>Latitude</h6>
          {city?.latitude}
          <h6>Longitude</h6>
          {city?.longitude}

          <h5>Timezone</h5>
          {city?.timezone}
        </section>

        <section style={{ alignItems: "left", paddingLeft: "1px" }}>
          <h5>Scores</h5>
          <h6>Business Freedom</h6>
          {city?.business_freedom ? parseFloat(city?.business_freedom.toFixed(4)) : " "}  
          {/* {city?.business_freedom && <div>here</div>} */}

          <h6>Cost of Living</h6>
          {city?.cost_of_living ? parseFloat(city?.cost_of_living.toFixed(4)) : " "}   

          <h6>Economy</h6>
          {city?.economy ? parseFloat(city?.economy.toFixed(4)) : " "}

          <h6>Housing</h6>
          {city?.housing ? parseFloat(city?.housing.toFixed(4)) : " "}

          <h6>Commute</h6>
          {city?.commute ? parseFloat(city?.commute.toFixed(4)) : " "}

          <h6>Education</h6>
          {city?.education ? parseFloat(city?.education.toFixed(4)) : " "}

          <h6>Environmental Quality</h6>
          {city?.environmental_quality ? parseFloat(city?.environmental_quality.toFixed(4)) : " "}

          <h6>Healthcare</h6>
          {city?.healthcare ? parseFloat(city?.healthcare.toFixed(4)) : " "}  

          <h6>Leisure and Culture</h6>
          {city?.leisure_culture ? parseFloat(city?.leisure_culture.toFixed(4)) : " "}

          <h6>Outdoors</h6>
          {city?.outdoors ? parseFloat(city?.outdoors.toFixed(4)) : " "}

          <h6>Safety</h6>
          {city?.safety ? parseFloat(city?.safety.toFixed(4)) : " "}

          <h6>Taxation</h6>
          {city?.taxation ? parseFloat(city?.taxation.toFixed(4)) : " "}

          <h6>Travel and Connectivity</h6>
          {city?.travel_connectivity ? parseFloat(city?.travel_connectivity.toFixed(4)) : " "}

          <h6>Internet Access</h6>
          {city?.internet_access ? parseFloat(city?.internet_access.toFixed(4)) : " "}

          <h6>Venture Capital</h6>
          {city?.venture_capital ? parseFloat(city?.venture_capital.toFixed(4)) : " "}   
        </section>
        <section>
          <h5>Restaurants in {city?.name}</h5>
          {city?.restaurants ? (
            city?.restaurants?.split(", ").map((r, index) => (
              <a
                href={"/restaurants/" + city?.restaurant_ids.split(", ")[index]}
              >
                {r}
                <br />
              </a>
            ))
          ) : (
            <p>loading</p>
          )}

          <h5>Cuisines of {city?.name}</h5>
          {cuisines?.map((c) => (
            <a href={"/cuisines/" + c.id}>
              {c.name}
              <br />{" "}
              <img src={c.dishes[0].image_url} width="200" height="200"></img>
            </a>
          ))}
        </section>

        {/* <h5>Health</h5>
        {data["recipe"]["healthLabels"].map((healthLabel: any) => {
          return <li>{healthLabel}</li>;
        })}
      </section>

      <Image src={data["recipe"]["image"]} fluid />

      <p>{data["recipe"]["source"]}</p>

      <h5>Calories: {data["recipe"]["calories"]}</h5>
      <h5>Total energy (kcal): {data["recipe"]["totalNutrients"]["ENERC_KCAL"]["quantity"]}</h5>

      <p>
        <h5>Ingredients</h5>
        {data["recipe"]["ingredientLines"].map((ingredient: any) => {
          return <li>{ingredient}</li>;
        })}
      </p>

      <h5>Restrictions</h5>
      {data["recipe"]["cautions"].length == 0
        ? "No restrictions"
        : data["recipe"]["cautions"].map((caution: any) => {
            return <li>{caution}</li>;
          })
      }

      <h5>Country: </h5>
      <a href={"/countries/" + countryIndex}>{country["name"]}</a>

      <h5>Mentioned in news articles: </h5>
      <a href={"/news/" + newsIndex}>{article["title"]}</a>
      <br />

      <div className="center">
        <h3>Recipe video</h3>
        <iframe
          src={youTubeURL}
          width="50%"
          height="400"
          allow="fullscreen"
          title="video"
        />
      </div> */}
      </Container>
      <div className="center">
        <h4>Map Location</h4>
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
