import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Navbar } from "react-bootstrap";
import Footer from "../../components/Footer";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";

function Cities() {
  useEffect(() => {
    document.title = "Cities";
  }, []);
  const [cities, setCities] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios("/api/cities");
  useEffect(() => {
    document.title = "Cities";
  }, []);
  useEffect(() => {
    if (data) {
      setCities(data.cities);
      console.log(data.cities);
    }
  }, [data]);

  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber-1);
  console.log(startIndex)
  const currentData = cities.slice(startIndex, startIndex + numPerPage);
  console.log("Cities", cities);
  var i, j;
  var chunk = 3;
  var rows = [];
  for (i = 0, j = currentData.length; i < j; i += chunk) {
    rows.push(currentData.slice(i, i + chunk));
  }

  return (
    <div>
      <h1 className="text-align center">Cities</h1>
      <Container>
        {/* {currentData.map((city) => (
          <div>
            {city["name"]}
          </div>
        ))} */}
        {rows.map((cols) => (
          <Row>
            {cols.map((city: any, i: any) => (
              <Col className="col-sm-4 py-2">
                <Card bg="card h-100">
                  <Card.Body>
                    <a href={"/cities/" + city["id"]}>
                      <Card.Title>{city["name"]}</Card.Title>
                    </a>
                    <Card.Img variant="top" src={city["imagesmobile"]} />
                    <p>
                      <b>State: </b> {city["state"]} <br />
                      <b>Leisure and Culture: </b> {city["leisure_culture"]}{" "}
                      <br />
                      <b>Cost of Living: </b> {parseFloat(city["cost_of_living"].toFixed(4))} <br />
                      <b>Environmental Quality: </b>{" "}
                      {parseFloat(city["environmental_quality"].toFixed(4))} <br />
                      <b>Travel Connectivity: </b> {parseFloat(city["travel_connectivity"].toFixed(4))}{" "}
                      <br />
                      <b>Population: </b> {city["population"].toLocaleString()} <br />
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <div className="row pagination">
      <Pagination   
        count={Math.ceil(cities.length / numPerPage )}
        page={pageNumber}
        onChange={handleChange}
      ></Pagination>
      {startIndex+1 } - {Math.min(startIndex + numPerPage, cities?.length)} of {cities?.length}
      </div>

    </div>
  );
}

export default Cities;
