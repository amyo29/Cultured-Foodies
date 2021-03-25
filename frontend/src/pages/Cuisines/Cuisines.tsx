import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card, Navbar } from "react-bootstrap";
import useAxios from 'axios-hooks';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';

function Countries() {
  useEffect(() => {
    document.title = "Cuisines"
  }, [])
  const [cuisines, setCuisines] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const handleChange = (event:any, value:number) => {
    setPageNumber(value );
  };
  const [{ data, loading, error }] = useAxios('/api/cuisines')

  useEffect(() => {
    if (data) {
      setCuisines(data.cuisines)
      console.log(data.cuisines)
    }

    axios.get("/api/countries").then((value) => {
      let countries = value["data"]["countries"]
      console.log('countries', countries)
      // let filtered = countries.filter(country:any => country['id'] ==1)
      // console.log('country', filtered)
    });
    
  },[data])


  const numPerPage = 12;
  const startIndex= numPerPage* (pageNumber-1);
  const currentData = cuisines.slice(startIndex, startIndex+numPerPage);
  var i, j;
  var chunk = 3;
  var rows = [];
  for (i = 0, j = currentData.length; i < j; i += chunk) {
    rows.push(currentData.slice(i, i + chunk));
  }
  
  return (
    <div>
      <h1 className="text-align center">Cuisines</h1>
      <Container>
        {rows.map((cols) => (
          <Row>
            {cols.map((cuisine:any, i :any) => (
              <Col className="col-sm-4 py-2">
                <Card bg='card light h-100'>
                  <Card.Body>
                      <a href={"/cuisines/" + cuisine['id']}>
                        <Card.Title>{cuisine['name']}</Card.Title>
                      </a>
                    <Card.Text>
                      <p>
                        <b>Country: </b>{cuisine['country']} <br />

                      </p>
                    </Card.Text>
                    <Card.Text>
  
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <Pagination count = {parseInt((cuisines.length/numPerPage)+"")} page={pageNumber} onChange={handleChange}></Pagination>

      {/* <Footer></Footer> */}
    </div>
  );
}
//mobile for card, web for instance page
export default Countries;
