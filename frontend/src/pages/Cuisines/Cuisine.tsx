import React,{useEffect, useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import "../../styles/Cuisine.css";
import useAxios from 'axios-hooks';
import axios from "axios";
import {RestaurantInstance} from "../Restaurants/Restaurant";
import {CityInstance} from "../Cities/City";

function Cuisine() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    document.title = "Cuisine";
  }, []);

  const [{ data, loading, error }] = useAxios('/api/cuisines/id='+id) 
  const [cuisine, setCuisine] = useState<CuisineInstance>();
  const [country, setCountry] = useState<CountryInstance>()


  /* set city data */
  useEffect(() => {
    
    const cuisineObj: CuisineInstance = data as CuisineInstance;
    if (cuisineObj) {
      setCuisine(cuisineObj)
      let countryUrl = cuisineObj?.countryID
      console.log(countryUrl)
      console.log('here',cuisineObj)
      axios.get('/api/countries/id=' + cuisineObj?.countryID).then((value)=>
      {
        
        const countryObj: CountryInstance = value["data"] as CountryInstance;
        setCountry(countryObj)
        console.log(country)
      });
    
    }
  }, [data]);

  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8";
  let countryMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    API_KEY +
    "&q=" +
    country?.name;


  return (

    <Container fluid>
      <header>
        <h1>{cuisine?.name}</h1>
        Country: {country?.name}
      </header>

      <p></p>
      <Row>
        <Col xs={6} md={4}>
          <Image src={country?.flag} fluid />
        </Col>
      </Row>
      <section>
        <h5>Alpha 3 Code:</h5>
        {country?.alpha3code}

        <h5>Region</h5>
        {country?.region}

        <h5>Subregion</h5>
        {country?.subregion}
      </section>

      <h5>Population</h5>
      {country?.population}

      <h5>Capital city</h5>
      {country?.capital}

      <h5>Bordering Countries</h5>
      {country?.borders.split(", ").map((border: any) => {
          return <li>{border}</li>;
        }) }

      <section>
        <h5>Time Zones</h5>
        {country?.timezones}
      </section>
      <h5>Translations</h5>
      {country? (Object.keys(country?.translations).map((key, index) => ( 
          <p key={index}> {key} : {country?.translations[key]}</p> 
        ))) : (<p>he</p>)

      }

    <section>
        <h5>Restaurants with {cuisine?.name} food</h5>
        {cuisine?.restaurants?  cuisine?.restaurants?.split(", ").map((r,index) => (
            <a href={"/restaurants/" + cuisine?.restaurant_ids.split(", ")[index]}>{r}<br/></a> 
          )):
        <p>loading</p>
        }

        <h5>Cities with {cuisine?.name} food</h5>
        {cuisine?.cities?  cuisine?.cities?.split(", ").map((c,index) => (
            <a href={"/cities/" + cuisine?.city_ids.split(", ")[index]}>{c}<br/></a> 
          )):
        <p>loading</p>
        }
      </section>
      <p></p>
      <p></p>
      <p></p>
      <p></p>

        <div className="center">
          <h4>Map Location</h4>
          <iframe
            src={countryMapURL}
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div> 

    </Container>
  );
}

interface Dish {
  image_url: string;
  name: string; 
}

export interface CuisineInstance {
  country:string;
  countryID: string;
  city_ids: string;
  cities: string;
  restaurant_ids: string;
  restaurants: string;
  description:string;
  dishes: Array<Dish>;
  name:string;
  id: number;
}
export interface translation{
  br:string,
  de: string,
  es: string,
  fa:string,
  fr:string,
  hr: string,
  it: string,
  ja: string,
  nl:string,
  pt: string
}

export interface CountryInstance{
  alpha2code: string,
  alpha3code: string,
  area:number,
  borders: string,
  capital: string,
  currencies: string,
  demonym: string,
  flag:string;
  gini: number,
  id: number,
  languages: string,
  latitude: number,
  longitude: number,
  name: string,
  native_name: string,
  numeric_code: number,
  population: number,
  region: string,
  subregion: string,
  timezones: string,
  translations: any


}
export default Cuisine;
