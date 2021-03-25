import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card, ListGroup, Navbar } from "react-bootstrap";
import Footer from "../../components/Footer";
import useAxios from 'axios-hooks'
import { Pagination } from '@material-ui/lab';
// const data = require("../../data/threeDishes.json");
const data1 = require("../../data/newData/threeCities.json");

function Cities() {
  useEffect(() => {
    document.title = "Cities"
  }, [])
  const [cities, setCities] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const handleChange = (event:any, value:number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios('/api/cities')
  useEffect(() => {
    document.title = "Cities"

  }, [])
  useEffect(() => {
    if (data) {
      setCities(data.cities)
      console.log(data.cities)
    }
  },[data])


  const numPerPage = 12;
  const startIndex= numPerPage*pageNumber;
  const currentData = cities.slice(startIndex, startIndex+numPerPage);
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
              <Col className = "col-sm-4 py-2">
         
                
                <Card bg='card h-100'>
                  <Card.Body>
                    <a href= {"/cities/"+ i}><Card.Title>{city["name"]}</Card.Title></a>
                    {/* <Card.Img variant="top" src={city["images"]["mobile"]} />*/}
                      <p>
                        <b>State: </b> {city["state"]} <br />
                        <b>Leisure and Culture: </b> {city["leisure_culture"]} <br />
                        <b>Cost of Living: </b> {city["cost_of_living"]} <br />
                        <b>Environmental Quality: </b> {city["environmental_quality"]} <br />
                        <b>Travel Connectivity: </b> {city["travel_connectivity"]} <br />
                        <b>Population: </b> {city["population"]} <br />
                      </p> 
                  </Card.Body>
                </Card> 
                
                
              </Col>
            ))}
          </Row>
        ))}

      </Container>
      <Pagination count = {parseInt((cities.length/numPerPage)+"")} page={pageNumber} onChange={handleChange}></Pagination>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default Cities;
