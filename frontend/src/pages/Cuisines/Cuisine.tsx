import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Figure,
  Card,
  CardColumns,
  CardDeck,
  CardImg,
  Carousel,
  Badge,
  Tabs,
  Tab,
  Media,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import "../../styles/Cuisine.css";
import useAxios from "axios-hooks";
import axios from "axios";

function Cuisine(id: any) {
  useEffect(() => {
    document.title = "Cuisine";
  }, []);

  const [{ data, loading, error }] = useAxios("/api/cuisines/id=" + id.id);
  const [cuisine, setCuisine] = useState<CuisineInstance>();
  const [countries, setCountries] = useState<Array<CountryInstance>>();
  const [dishes, setDishes] = useState<any>();

  function matchesCuisineCountries(element: any, index: number, array: any) {
    return cuisine?.countryID.split(", ").includes(element?.id.toString());
  }
  /* set city data */
  useEffect(() => {
    const cuisineObj: CuisineInstance = data as CuisineInstance;
    if (cuisineObj) {
      setCuisine(cuisineObj);
      var chunk = 3;
      var rows = [];
      var i,
        j = 0;
      for (i = 0, j = cuisineObj.dishes.length; i < j; i += chunk) {
        rows.push(cuisineObj.dishes.slice(i, i + chunk));
      }
      setDishes(rows);
    }
  }, [data]);

  useEffect(() => {
    axios.get("/api/countries").then((value) => {
      let all_countries = value["data"]["countries"];
      let filtered_countries = all_countries.filter(matchesCuisineCountries);
      setCountries(filtered_countries);
    });
  }, [cuisine]);
  console.log(countries);

  let API_KEY = "AIzaSyBnpJl9h_gz0umc1sVng27AS3rNZOg7LR8";

  //Carousel:
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <h1 className="Instance-header">{cuisine?.name} Cuisine</h1>
      {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first"></Tab.Container> */}
      {countries?.map((country) => (
        <>
          <div style={{
            margin: 20
          }}>

          <h2 className="Instance-header">Country of {country?.name} 
          {/* <img
          width={128}
          height={64}
          className="ml-3"
          src={country?.flag}
          alt="Generic placeholder"
        /> */}
        </h2>
         <Row style={{paddingBottom: 20}}>
          <img
          width={256}
          height={128}
          className="mx-auto"
          src={country?.flag}
        />
        </Row>
  
            {/* <Image src={country?.flag} className="flag-responsive"  /> */}
            <Card.Title as="h3">Dishes</Card.Title>

            <Carousel activeIndex={index} onSelect={handleSelect}>
              {dishes.map((cols: any) => (
                <Carousel.Item>
                  <CardDeck>
                    {cols.map((dish: any) => (
                      <Card>
                        <Card.Title><h4 className="mt-4">{dish.name}</h4></Card.Title>
                        <Card.Img
                          src={dish.image_url}
                          // style={{ height: '15rem' }}
                          className="carousel-img"
                        />
                      </Card>
                    ))}
                  </CardDeck>
                </Carousel.Item>
              ))
              }
            </Carousel>
          </div>
          <Container fluid>
            {/* <CardColumns style={{margin: 20}}> */}
            <Row xs={1} md={2} style={{marginBottom: 20}}>
              <Col>
                <Card border="dark" style={{ maxHeight: "30rem" }}>
                  <Card.Header as="h3">Basic Info:</Card.Header>
                  {/* <div className="card-body align-self-start"> */}
                  <div className="my-custom-scrollbar" >
                    <Card.Body>
                      <Card.Text><h5>Capital city:</h5>{country?.capital}</Card.Text>
                      <Card.Text><h5>Alpha 3 Code:</h5> {country?.alpha3code}</Card.Text>
                      <Card.Text><h5>Region:</h5> {country?.region}</Card.Text>
                      <Card.Text><h5>Subregion:</h5> {country?.subregion}</Card.Text>
                      <Card.Text>
                        <h5>Latitude/Longitude:</h5> {country?.latitude},{" "}
                        {country?.longitude}
                      </Card.Text>
                      <Card.Text>
                        <h5>Area:</h5> {country?.area.toLocaleString()} km<sup>2</sup>
                      </Card.Text>
                      <Card.Text>
                        <h5>Population:</h5> {country?.population.toLocaleString()}
                      </Card.Text>
                      <Card.Text>
                        <h5>Bordering Countries:</h5>
                        {country?.borders ? (
                          country?.borders.split(", ").map((border: any) => {
                            return <li>{border}</li>;
                          }))
                          :
                          <Card.Text>N/A</Card.Text>
                        }
                      </Card.Text>
                      <Card.Text><h5>Time Zones:</h5> {country?.timezones}</Card.Text>
                      <Card.Text>
                        <h5>Translations:</h5>
                        {country ? (
                          Object.keys(country?.translations).map(
                            (key, index) => (
                              <p key={index}>
                                {" "}
                                {key} : {country?.translations[key]}
                              </p>
                            )
                          )
                        ) : (
                          <p>he</p>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
              <Col style={{ maxHeight: "30rem" }}>
                <Card>
                  <Card.Header as="h3">Location</Card.Header>
                  <iframe
                    src={
                      "https://www.google.com/maps/embed/v1/place?key=" +
                      API_KEY +
                      "&q=" +
                      country?.name
                    }
                    className="cardmap-responsive"
                  ></iframe>
                </Card>
              </Col>
              {/* <Card border="dark">
              <Card.Header as="h3">Flag:</Card.Header>
              <Card.Img src={country?.flag}></Card.Img>
            </Card>

            <Card border="dark">
              <Card.Header as="h3">Cities with {cuisine?.name} food</Card.Header>
              <Card.Body>
              {cuisine?.cities ? (
                cuisine?.cities?.split(", ").map((c, index) => (
                  <a href={"/cities/" + cuisine?.city_ids.split(", ")[index]} target="_blank">
                    {c}
                    <br />
                  </a>
                ))
              ) : (
                <p>loading</p>
              )}
              </Card.Body>
            </Card>     

            <Card border="dark">
              <Card.Header as="h3">Restaurants with {cuisine?.name} food</Card.Header>
              <Card.Body>
              {cuisine?.restaurants ? (
                cuisine?.restaurants?.split(", ").map((r, index) => (
                  <a
                    href={
                      "/restaurants/" + cuisine?.restaurant_ids.split(", ")[index]
                    }
                    target="_blank"
                  >
                     {r}
                    <br />
                  </a>
                ))
              ) : (
                <p>loading</p>
              )}
              </Card.Body>
            </Card> */}
            </Row>
            {/* </CardColumns> */}
          </Container>
          {/* <Card border="dark">
            <Card.Header as="h3">Flag:</Card.Header>
            <Card.Img src={country?.flag}></Card.Img>
          </Card> */}

          {/* <Row xs={1} md={2} style={{marginBottom: 20}}> 
          <Col>
          <Card border="dark" style={{ maxHeight: "30rem" }}>
            <Card.Header as="h3">Cities with {cuisine?.name} cuisine</Card.Header>
            <div className="my-custom-scrollbar" >
            <Card.Body>
              {cuisine?.cities ? (
                cuisine?.cities?.split(", ").map((c, index) => (
                  <a href={"/cities/" + cuisine?.city_ids.split(", ")[index]} target="_blank">
                    {c}
                    <br />
                  </a>
                ))
              ) : (
                <p>loading</p>
              )}
            </Card.Body>
            </div>
          </Card>
          </Col>
          <Col>
          <Card border="dark" style={{ maxHeight: "30rem" }}>
            <Card.Header as="h3">Restaurants with {cuisine?.name} cuisine</Card.Header>
            <div className="my-custom-scrollbar" >
            <Card.Body>
              {cuisine?.restaurants ? (
                cuisine?.restaurants?.split(", ").map((r, index) => (
                  <a
                    href={
                      "/restaurants/" + cuisine?.restaurant_ids.split(", ")[index]
                    }
                    target="_blank"
                  >
                    {r}
                    <br />
                  </a>
                ))
              ) : (
                <p>loading</p>
              )}
            </Card.Body>
            </div>
          </Card>
          </Col>

          </Row> */}

          <div style={{margin: 20}} >
          <Card border="dark" style={{ maxHeight: "30rem" }}>
            <Card.Header as="h3">Cities with {cuisine?.name} cuisine</Card.Header>
            <div className="my-custom-scrollbar" >
            <Card.Body>
              {cuisine?.cities ? (
                cuisine?.cities?.split(", ").map((c, index) => (
                  <a href={"/cities/" + cuisine?.city_ids.split(", ")[index]} target="_blank">
                    {c}
                    <br />
                  </a>
                ))
              ) : (
                <p>loading</p>
              )}
            </Card.Body>
            </div>
          </Card>
          </div>
          <div style={{margin: 20}}>
          <Card border="dark" style={{ maxHeight: "30rem" }}>
            <Card.Header as="h3">Restaurants with {cuisine?.name} cuisine</Card.Header>
            <div className="my-custom-scrollbar" >
            <Card.Body>
              {cuisine?.restaurants ? (
                cuisine?.restaurants?.split(", ").map((r, index) => (
                  <a
                    href={
                      "/restaurants/" + cuisine?.restaurant_ids.split(", ")[index]
                    }
                    target="_blank"
                  >
                    {r}
                    <br />
                  </a>
                ))
              ) : (
                <p>loading</p>
              )}
            </Card.Body>
            </div>
          </Card>
          </div>
          
          {/* <div className="center">
            <h4>Map Location</h4>
            <div className="map-responsive">
              <iframe
                src={
                  "https://www.google.com/maps/embed/v1/place?key=" +
                  API_KEY +
                  "&q=" +
                  country?.name
                }
                width="500"
                height="350"
                loading="lazy"
              ></iframe>
            </div> 
          </div>*/}
        </>
      ))}
    </div>
  );
}

interface Dish {
  image_url: string;
  name: string;
}

export interface CuisineInstance {
  country: string;
  countryID: string;
  city_ids: string;
  cities: string;
  restaurant_ids: string;
  restaurants: string;
  description: string;
  dishes: Array<Dish>;
  name: string;
  id: number;
}
export interface translation {
  br: string;
  de: string;
  es: string;
  fa: string;
  fr: string;
  hr: string;
  it: string;
  ja: string;
  nl: string;
  pt: string;
}

export interface CountryInstance {
  alpha2code: string;
  alpha3code: string;
  area: number;
  borders: string;
  capital: string;
  currencies: string;
  demonym: string;
  flag: string;
  gini: number;
  id: number;
  languages: string;
  latitude: number;
  longitude: number;
  name: string;
  native_name: string;
  numeric_code: number;
  population: number;
  region: string;
  subregion: string;
  timezones: string;
  translations: any;
}
export default Cuisine;
