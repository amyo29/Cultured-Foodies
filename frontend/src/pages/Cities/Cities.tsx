import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card,ListGroup, Navbar, Button, Spinner, DropdownButton, Dropdown} from "react-bootstrap";
import Footer from "../../components/Footer";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import { CitiesCard } from "../../components/Card";

import logo from "../../static_resources/spinny.gif";

function Cities() {
  useEffect(() => {
    document.title = "Cities";
  }, []);
  const [cities, setCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [loaded, changeLoading] = useState(false);
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
      setDisplayedCities(data.cities)
      changeLoading(true);
    }
  }, [data]);


  let onSort = (sortableField: string, ascending: boolean) => {
    var copy = cities.slice(0);
    copy.sort(function (a: any, b: any) {
      if (ascending){
        return a[sortableField] > b[sortableField]? 1: -1;
      }else {
        return a[sortableField] >  b[sortableField]? -1: 1;
      }
    });

    setDisplayedCities(copy)
  };

  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber - 1);
  const currentData = displayedCities.slice(startIndex, startIndex + numPerPage);
  var i, j;
  var chunk = 3;
  var rows = [];
  for (i = 0, j = currentData.length; i < j; i += chunk) {
    rows.push(currentData.slice(i, i + chunk));
  }

  return (
    <div>
      <h1 className="text-align center">Cities</h1>
      { loaded ? (
      <Container>
        <DropdownButton id="dropdown-basic-button" title="Sort By">
          <Dropdown.Item  onClick={() => onSort("name", true)} >City Name (A-Z)</Dropdown.Item>
          <Dropdown.Item  onClick={() => onSort("leisure_culture", false)} >Leisure and Culture Score</Dropdown.Item>
          <Dropdown.Item  onClick={() => onSort("cost_of_living", false)} >Cost of Living Score</Dropdown.Item>
          <Dropdown.Item  onClick={() => onSort("environmental_quality", false)} >Environmental Quality Score</Dropdown.Item>
          <Dropdown.Item  onClick={() => onSort("travel_connectivity", false)} >Travel Connectivity Score</Dropdown.Item>
          <Dropdown.Item  onClick={() => onSort("population", true)}>Population (asc)</Dropdown.Item>
          <Dropdown.Item  onClick={() => onSort("population", false)}>Population (desc)</Dropdown.Item>

        </DropdownButton>
        {rows.map((cols) => (
          <Row> 
            {cols.map((city: any, i: any) => (
              <Col className="col-sm-4 py-2">
                <CitiesCard city={city}></CitiesCard> 
              </Col>
            ))} 
          </Row>
        ))}
      </Container>
      ) 
      : 
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40
      }}>
      {/* <Spinner animation="border" variant="dark" 
      as="span" 
      role="status"
      aria-hidden="true"/>
       */}
      <img src={logo} alt="loading..."/>
      </div>
      }
      <div className="row pagination">
        <Pagination
          count={Math.ceil(cities.length / numPerPage)}
          page={pageNumber}
          onChange={handleChange}
        ></Pagination>
        {startIndex + 1} - {Math.min(startIndex + numPerPage, cities?.length)}{" "}
        of {cities?.length}
      </div>
    </div>
  );
}

export default Cities;
