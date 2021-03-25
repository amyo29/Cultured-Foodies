import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAxios from 'axios-hooks';

function City() {
  useEffect(() => {
    document.title = "City";
  }, []);
  const { id } = useParams<{ id: string }>();
  const [{ data, loading, error }] = useAxios('/api/cities/id='+id) 
  const [city, setCity] = useState<City>();

  /* set city data */
  useEffect(() => {
    const cityObj: City = data as City;
    if (cityObj) {setCity(cityObj);}
  }, [data]);
  
  
  return (

    <Container > 
      <Image src={city?.imagesweb} fluid />

      <h1>{city?.name}</h1> 

      <section>
        <h3>Full Name</h3>
        {city?.full_name}

        <h5>State</h5>
        {city?.state}

        <h5>Population</h5>
        {city?.population}

        <h5>Location</h5>
        <h6>Latitude</h6>
        {city?.latitude}
        <h6>Longitude</h6>
        {city?.longitude}

      </section>

      <section style={{alignItems:"left", paddingLeft:"1px"}}>  
        <h5>Scores</h5>
        <h6>Business Freedom</h6>
        {city?.business_freedom}

        <h6>Cost of Living</h6>
        {city?.cost_of_living}

        <h6>Economy</h6>
        {city?.economy}

        <h6>Housing</h6>
        {city?.housing}

        <h6>Commute</h6>
        {city?.commute}

        <h6>Education</h6>
        {city?.education}

        <h6>Environmental Quality</h6>
        {city?.environmental_quality}

        <h6>Healthcare</h6>
        {city?.healthcare}

        <h6>Leisure and Culture</h6>
        {city?.leisure_culture}

        <h6>Outdoors</h6>
        {city?.outdoors}

        <h6>Safety</h6>
        {city?.safety}

        <h6>Taxation</h6>
        {city?.taxation}

        <h6>Travel and Connectivity</h6>
        {city?.travel_connectivity}

        <h6>Internet Access</h6>
        {city?.internet_access}

        <h6>Venture Capital</h6>
        {city?.venture_capital}

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
  );
}

export interface City {
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
}


export default City;
