import React, { useEffect , useState, Component} from "react";
import { useParams } from "react-router-dom";
import "../../styles/Restaurant.css";
import Card from "react-bootstrap/Card";
import useAxios from 'axios-hooks';
import axios from 'axios';
import {CuisineInstance} from '../Cuisines/Cuisine';
import {CityInstance} from '../Cities/City';
function Restaurant() {
  useEffect(() => {
    document.title = "News Article";
  }, []);
  const { id } = useParams<{ id: string }>();
  const [{ data, loading, error }] = useAxios('/api/restaurants/id='+id) 
  const [restaurant, setRestaurant] = useState<RestaurantInstance>();
  const [cuisines, setCuisines] = useState<Array<CuisineInstance>>();
  function matchesRestaurantCuisines(element:any, index: number, array: any){ 
    return restaurant?.cuisine_ids.split(", ").includes(element?.id.toString())
  } 
 
  useEffect(() => {
    const restaurantObj: RestaurantInstance = data as RestaurantInstance;
    if (restaurantObj) {setRestaurant(restaurantObj);}
  }, [data]);
  useEffect(() => {
    axios.get("/api/cuisines").then((value) => {
      let all_cuisines = value["data"]["cuisines"]
      let filtered_cuisines = all_cuisines.filter(matchesRestaurantCuisines)
      setCuisines(filtered_cuisines)
    });
  }, [restaurant])
  
  

  // // model navigation
  // let countryIndex = article["countryIndex"];
  // let dishIndex = article["dishIndex"];

  // let country = countries_data[countryIndex]["name"];
  // let countryFlag = countries_data[countryIndex]["flag"];

  // let dishName = dishes_data[dishIndex]["recipe"]["label"]

  // // attributes and media
  // let img = article["media"];
  // let authorImage = article["authorimage"];
  // let title = article["title"];
  // let language = article["language"];
  // let author = article["author"];
  // let publishedDate = article["published_date"];
  // let summmary = article["summary"];
  // let link = article["link"];
  // let source = article["clean_url"]
  // let source_business_name = article["meta_business_title"]
  // let source_desc = article["meta_business_summary"]
  // let topic = article["topic"]

  // let img = restaurant["restaurant_image"];
  // let authorImage = article["authorimage"];
  // let name = restaurant["name"];
  // let language = article["language"];
  // let author = article["author"];
  // let publishedDate = article["published_date"];
  // let summmary = article["summary"];
  // let link = article["link"];
  // let source = article["clean_url"];
  // let source_business_name = article["meta_business_title"];
  // let source_desc = article["meta_business_summary"];
  // let topic = article["topic"];


  return (
    // <div className="center">
    //   {/* <img src={img} className="article-img"></img> */}
    //   <h1>{restaurant?.name}</h1>

    //   <section>
    // <h5>City Locations</h5>
    //  <a href={"/cities/" + restaurant?.city_id}>{restaurant?.city}<br/></a>
    // <h5>Cuisines of {restaurant?.name}</h5>
    // {cuisines?.map((c) => (<a href={"/cuisines/" + c.id}>{c.name}<br/></a>))}
    // </section>
    // </div>

    <div>
        <body className="Instance center-div">
        <h2 className="Instance-header">{restaurant?.name}</h2>
        <div className="info" text-align= "center">
            <img className="instance-photo row" src={restaurant?.restaurant_image} alt=""/>
            <Card className="instance-text row" style={{width: '34rem'}}>
                <Card.Body>
                    <Card.Title>{restaurant?.name}</Card.Title>
                    <Card.Text>
                        Address: {restaurant?.address}
                    </Card.Text>
                    <Card.Text>
                        Average Rating: ${restaurant?.aggregate_rating}
                    </Card.Text>
                    <Card.Text>
                        Highlights: {restaurant?.highlights}
                    </Card.Text>
                    <Card.Text>
                        Price Range: {restaurant?.price_range}
                    </Card.Text>
                    <Card.Text>
                        Timings: {restaurant?.timings}
                    </Card.Text>
                    <Card.Text>
                        Menu: 
                        { <a href= {restaurant?.menu_url} >{restaurant?.menu_url}<br/></a>} 
                    </Card.Text>  
                    <Card.Text>
                        Cities which have this restaurant:    
                        { <a href={"/cities/" + restaurant?.city_id}>{restaurant?.city}<br/></a>}
                    </Card.Text>
                    <Card.Text>
                        Cuisines of {restaurant?.name}: 
                        { cuisines?.map((c) => (<a href={"/cuisines/" + c.id}>{c.name}<br/></a>))}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        </body>
    </div>

    //   <div className="center">
    //   <img src={img} className="article-img"></img>
    //   <h1>{title}</h1>

    //   <p>
    //   Language: {language} <br/>
    //     Published: {publishedDate} <br/>
    //   News source: {source}<br/></p>

    //   <a href={"/dishes/" + dishIndex}>
    //     <h5>Associated Dish: {dishName}</h5>
    //   </a>
    //   <a href={"/countries/" + countryIndex}>
    //     <img src={countryFlag} className="flag-img"></img>
    //     <h5>Dish's Origin: {country}</h5>
    //   </a>
    //   <div className="text-left px-2">
    //   <h4>{summmary}</h4>
    //   <br/>

    //   <h5><b>Source Title:</b> {source_business_name}</h5>
    //   <h5><b>About the News Source:</b> {source_desc}</h5>

    //   </div>
    //   <div>
    //   <a href={link} target="_blank">
    //     <h5>Link to the article</h5>
    //   </a>
    //   <h4>Author: {author}</h4>
    //   <img src={authorImage} className="author-img center"></img>
    //   </div>
    // </div>
  );
}


export interface RestaurantInstance{
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
