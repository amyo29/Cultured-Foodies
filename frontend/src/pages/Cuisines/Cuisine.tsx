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
  const [restaurants, setRestaurants] = useState<Array<RestaurantInstance>>();
  const [cities, setCities] = useState<Array<CityInstance>>();

  function matchesCuisineCities(element:any, index: number, array: any){ 
    return cuisine?.city_ids.split(", ").includes(element?.id.toString())
  }
  
  function matchesCuisineRestaurants(element: any, index: number, array:any){
    return cuisine?.restaurant_ids.split(", ").includes(element?.id.toString())
  }
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
  

  useEffect(() => {
    axios.get("/api/cities").then((value) => {
      let all_cities = value["data"]["cities"]
      let filtered_cities = all_cities.filter(matchesCuisineCities)
      setCities(filtered_cities)
    });
    axios.get("/api/restaurants").then((value) => {
      let all_restaurants = value["data"]["restaurants"]
      let filtered_restaurants = all_restaurants.filter(matchesCuisineRestaurants)
      setRestaurants(filtered_restaurants)
    });
  }, [cuisine])

  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8";
  let countryMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    API_KEY +
    "&q=" +
    country?.name;

  // let dishIndex = data["dishIndex"];
  // let newsIndex = data["newsIndex"];
  // let dishName = dishes_data[dishIndex]["recipe"]["label"];
  // let newsArticle = news_data[newsIndex]["title"];
  // let newsLink = news_data[newsIndex];

  // console.log(newsLink);
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
      <h5>Restaurants with this cuisines</h5>
      {restaurants?.map((r) => (<a href={"/restaurants/" + r.id}>{r.name}<br/></a>))}
      <h5>Cities with this cuisine</h5>
      {cities?.map((c) => (<a href={"/cities/" + c.id}>{c.name}<br/></a>))}
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
  restaurant_ids: string;
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
