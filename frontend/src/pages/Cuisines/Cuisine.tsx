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

  return (
    <div>
      <h1 className="Instance-header">{cuisine?.name}</h1>
      {countries?.map((country) => (
        <>
          <Card>
            <Card.Title>
              <h2 className="Instance-header">Country: {country?.name} </h2>
            </Card.Title>
            <body>
              <div>
                {/* <div className="row"> */}

                <CardDeck>
                  <Card border="dark">
                    <Card.Header as="h3">Basic Info:</Card.Header>

                    <Card.Body>
                      <Card.Text>Capital city: {country?.capital}</Card.Text>
                      <Card.Text>Alpha 3 Code: {country?.alpha3code}</Card.Text>
                      <Card.Text>Region: {country?.region}</Card.Text>
                      <Card.Text>Subregion: {country?.subregion}</Card.Text>
                      <Card.Text>
                        Latitude/Longitude: {country?.latitude},{" "}
                        {country?.longitude}
                      </Card.Text>
                      <Card.Text>
                        Area: {country?.area.toLocaleString()} km<sup>2</sup>
                      </Card.Text>
                      <Card.Text>
                        Population: {country?.population.toLocaleString()}
                      </Card.Text>
                      <Card.Text>
                        Bordering Countries:
                        {country?.borders.split(", ").map((border: any) => {
                          return <li>{border}</li>;
                        })}
                      </Card.Text>
                      <Card.Text>Time Zones: {country?.timezones}</Card.Text>
                      <Card.Text>
                        Translations:
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
                      <Card.Text>Dishes</Card.Text>
                      <Card.Text>
                        {dishes ? (
                          dishes.map((cols: any) => (
                            <Row>
                              {cols.map((dish: any, i: any) => (
                                <Col className="col-sm-4 py-2">
                                  <Figure>
                                    <Figure.Image
                                      width={170}
                                      height={180}
                                      alt="171x180"
                                      src={dish.image_url}
                                    />
                                    <Figure.Caption>{dish.name}</Figure.Caption>
                                  </Figure>
                                </Col>
                              ))}
                            </Row>
                          ))
                        ) : (
                          <p>loading</p>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card border="dark">
                    <Card.Header as="h3">Flag:</Card.Header>
                    <Card.Img src={country?.flag}></Card.Img>
                    {/* <Card.Body> 
                <iframe
                  src={
                    "https://www.google.com/maps/embed/v1/place?key=" +
                    API_KEY +
                    "&q=" +
                    country?.name
                  }
                  width="100%"
                  height="200%"
                  loading="lazy"
                ></iframe>
              </Card.Body> */}
                  </Card>
                </CardDeck>
              </div>
            </body>
          </Card>
          <h5>Restaurants with {cuisine?.name} food</h5>
          {cuisine?.restaurants ? (
            cuisine?.restaurants?.split(", ").map((r, index) => (
              <a
                href={
                  "/restaurants/" + cuisine?.restaurant_ids.split(", ")[index]
                }
              >
                {r}
                <br />
              </a>
            ))
          ) : (
            <p>loading</p>
          )}

          <h5>Cities with {cuisine?.name} food</h5>
          {cuisine?.cities ? (
            cuisine?.cities?.split(", ").map((c, index) => (
              <a href={"/cities/" + cuisine?.city_ids.split(", ")[index]}>
                {c}
                <br />
              </a>
            ))
          ) : (
            <p>loading</p>
          )}
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <div className="center">
            <h4>Map Location</h4>
            <div className="map-responsive">
              <iframe
                src={
                  "https://www.google.com/maps/embed/v1/place?key=" +
                  API_KEY +
                  "&q=" +
                  country?.name
                }
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </>
      ))}
    </div>

    // <Container>
    //   <Row className="justify-content-md-center">
    //     <h1 className="Instance-header">{cuisine ? cuisine.name : loading}</h1>
    //   </Row>
    //   {/*change orientation later */}
    //   <Card>

    //   </Card>
    //   <h5>{cuisine ? cuisine.description : loading}</h5>
    //   {countries?.map((country) => (
    //     <div>
    //       <h4>Country: {country?.name}</h4>
    // <Row>
    //   <Col xs={6} md={4}>
    //     <Image src={country?.flag} fluid />
    //   </Col>
    //   <Col xs={6} md={4}>
    //     <iframe
    //       src={
    //         "https://www.google.com/maps/embed/v1/place?key=" +
    //         API_KEY +
    //         "&q=" +
    //         country?.name
    //       }
    //       width="450"
    //       height="300"
    //       loading="lazy"
    //     ></iframe>
    //   </Col>
    // </Row>
    //       <section>
    //         <h5>Alpha 3 Code:</h5>
    //         {country?.alpha3code}
    //         <h5>Region</h5>
    //         {country?.region}
    //         <h5>Subregion</h5>
    //         {country?.subregion}
    //         <h5>Latitude/Longitude</h5>
    //         {country?.latitude}, {country?.longitude}
    //         <h5>Area</h5>
    //         {country?.area.toLocaleString()} km<sup>2</sup>
    //       </section>
    //       <h5>Population</h5>
    //       {country?.population.toLocaleString()}

    //       <h5>Capital city</h5>
    //       {country?.capital}

    //       <h5>Bordering Countries</h5>
    // {country?.borders.split(", ").map((border: any) => {
    //   return <li>{border}</li>;
    // })}

    //       <section>
    //         <h5>Time Zones</h5>
    //         {country?.timezones}
    //       </section>
    //       <h5>Translations</h5>
    // {country ? (
    //   Object.keys(country?.translations).map((key, index) => (
    //     <p key={index}>
    //       {" "}
    //       {key} : {country?.translations[key]}
    //     </p>
    //   ))
    // ) : (
    //   <p>he</p>
    // )}

    //       <h5>Dishes</h5>

    // {dishes ? (
    //   dishes.map((cols: any) => (
    //     <Row>
    //       {cols.map((dish: any, i: any) => (
    //         <Col className="col-sm-4 py-2">
    //           <Figure>
    //             <Figure.Image
    //               width={170}
    //               height={180}
    //               alt="171x180"
    //               src={dish.image_url}
    //             />
    //             <Figure.Caption>{dish.name}</Figure.Caption>
    //           </Figure>
    //         </Col>
    //       ))}
    //     </Row>
    //   ))
    // ) : (
    //   <p>loading</p>
    // )}
    //     </div>
    //   ))}

    //   {/*
    //   <p></p>

    // */}

    // <h5>Restaurants with {cuisine?.name} food</h5>
    // {cuisine?.restaurants ? (
    //   cuisine?.restaurants?.split(", ").map((r, index) => (
    //     <a
    //       href={"/restaurants/" + cuisine?.restaurant_ids.split(", ")[index]}
    //     >
    //       {r}
    //       <br />
    //     </a>
    //   ))
    // ) : (
    //   <p>loading</p>
    // )}

    // <h5>Cities with {cuisine?.name} food</h5>
    // {cuisine?.cities ? (
    //   cuisine?.cities?.split(", ").map((c, index) => (
    //     <a href={"/cities/" + cuisine?.city_ids.split(", ")[index]}>
    //       {c}
    //       <br />
    //     </a>
    //   ))
    // ) : (
    //   <p>loading</p>
    // )}
    // <p></p>
    // <p></p>
    // <p></p>
    // <p></p>
    // </Container>
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
