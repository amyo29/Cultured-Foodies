import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Navbar, DropdownButton, Dropdown } from "react-bootstrap";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import { CountryInstance, CuisineInstance } from "./Cuisine";
import axios from "axios";
import {CuisinesCard} from "../../components/Card";
import load from "../../static_resources/spinny donut.gif";

function Countries() {
  useEffect(() => {
    document.title = "Cuisines";
  }, []);
  const [cuisines, setCuisines] = useState([]);
  const [displayedCuisines, setDisplayedCuisines] = useState<Array<CuisineInstance>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [countries, setCountries]: any = useState({});
  const [loaded, changeLoading] = useState(false);
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios("/api/cuisines");

  useEffect(() => {
    if (data) {
      setCuisines(data.cuisines);
      setDisplayedCuisines(data.cuisines)
      // console.log(data.cuisines);
    }

    axios.get("/api/countries").then((value) => {
      let countries = value["data"]["countries"];
      // console.log("countries", countries);
      // let filtered = countries.filter(country:any => country['id'] ==1)
      // console.log('country', filtered)
    });
  }, [data]);
  /// {"id": countryObject}

  useEffect(() => {
    axios.get("/api/countries").then((value) => {
      let all_countries = value["data"]["countries"];
      let dict_countries: any = {};
      all_countries.forEach(function (country: any) {
        let id: number = country["id"];
        dict_countries[id] = country;
      });
      // console.log("here", dict_countries);
      setCountries(dict_countries);
      changeLoading(true);
      // cuisines.forEach(function (cuisine: any) {
      //   let id: string = cuisine["countryID"];
      //   let countries_string = id.split(", ");
      //   console.log("countries Id", countries_string);
      //   countries_string.forEach(function (cID: string) {
      //     console.log("here123", dict_countries[parseInt(cID)]);
      //   });
      // });
    });
  }, [displayedCuisines]);

  let onSort = (sortableField: string, ascending: boolean) => {
    var copy = cuisines.slice(0);
    copy.sort(function (a: any, b: any) {
      if (ascending){
        return a[sortableField] > b[sortableField]? 1: -1;
      } else {
        return a[sortableField] >  b[sortableField]? -1: 1;
      }
    });

    setDisplayedCuisines(copy)
  };
  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber - 1);
  const currentData = displayedCuisines.slice(startIndex, startIndex + numPerPage);
  var i, j;
  var chunk = 3;
  var rows = [];
  for (i = 0, j = currentData.length; i < j; i += chunk) {
    rows.push(currentData.slice(i, i + chunk));
  }

  if (loaded) {
    return (

      <div>
        <h1 className="text-align center">Cuisines</h1>
        <Container>
        <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item  onClick={() => onSort("name", true)} >Cuisine Name (A-Z)</Dropdown.Item>
            <Dropdown.Item  onClick={() => onSort("name", false)} >Cuisine Name (Z-A)</Dropdown.Item>
          </DropdownButton>
          {rows.map((cols) => (
            <Row>
              {cols.map((cuisine: any, i: any) => (
                <Col className="col-sm-4 py-2">
                  <CuisinesCard cuisine={cuisine} countries = {countries} loaded = {loaded}></CuisinesCard>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
        <div className="row pagination">
        <Pagination   
          count={Math.ceil(cuisines.length / numPerPage )}
          page={pageNumber} 
          onChange={handleChange}
        ></Pagination>
        {startIndex+1 } - {Math.min(startIndex + numPerPage, cuisines?.length)} of {cuisines?.length}
        </div>

        {/* <Footer></Footer> */}
      </div>
    );
  }
  else 
  {
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
        <img src={load} alt="loading..."/>
      </div>
    )
  }
}
//mobile for card, web for instance page
export default Countries;
