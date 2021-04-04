import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Navbar, Button, Spinner } from "react-bootstrap";
import Footer from "../../components/Footer";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import {CitiesCard } from "../../components/Card";
import { CityInstance } from "../Cities/City";

function Cities() {
  useEffect(() => {
    document.title = "Cities";
  }, []);
  const [cities, setCities] = useState([]);
  const [chunkedCities, setChunkedCities] = useState<Array<Array<CityInstance>>>([])
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
      changeLoading(true);
      //console.log(data.cities);
    }
  }, [data]);
  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber-1);

  useEffect(() => {
    console.log('entering useEffect', cities)
    const currentData = cities.slice(startIndex, startIndex + numPerPage);
    var i, j;
    var chunk = 3;
    var rows = [];
    for (i = 0, j = currentData.length; i < j; i += chunk) {
      rows.push(currentData.slice(i, i + chunk));
    }
    setChunkedCities(rows)

  }, [cities])

  let onSort = (sortableField: string) => {
    var copy = cities.slice(0)
    copy.sort(function(a:any, b:any){return a[sortableField]-b[sortableField]})
    setCities(copy)
  }

  return (    
    <div>
      <h1 className="text-align center">Cities</h1>
      { loaded ? (
      <Container>
      <Button onClick={() => onSort('population')}>sorting by population</Button>

        {chunkedCities.map((cols) => (
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
      <Spinner animation="border" variant="dark" 
      as="span" 
      role="status"
      aria-hidden="true"/>
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
