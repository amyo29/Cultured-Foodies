import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Navbar,
  Button,
  Spinner,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import Footer from "../../components/Footer";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import { CitiesCard } from "../../components/Card";
import logo from "../../static_resources/spinny.gif";
import { CityObject, CityInstance } from "./City";

/*
Search --> be able to sort and filter based on that


Features
-searching --> being able to sort on that subset [WORKS]
-pagination: fix for searching [WORKS]
-searching only on values of just the card (grid) [WORKS]
-Filterable
*/

function Cities() {
  useEffect(() => {
    document.title = "Cities";
  }, []);
  const [cities, setCities] = useState<Array<CityInstance>>([]);
  const [displayedCities, setDisplayedCities] = useState<Array<CityInstance>>(
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sortingField, setSortingField] = useState<SortingAttribute>();
  const [filteringFields, setFilteringFields] = useState<Array<string>>();
  // [{'name' : 'state', 'value': 'california'}, {'name': 'timezone', value: 'los angeles'}    ]
  const [pageNumber, setPageNumber] = useState(1);
  const [loaded, changeLoading] = useState(false);
  var states = ["Texas", "California"];
  var filterableNames = [{ name: "States", value: "state", options: states }];
  //proof of concept
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
      setDisplayedCities(data.cities);
      changeLoading(true);
    }
  }, [data]);

  let handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  let handleFilterChange = () => {
    //need to be able to check and uncheck
  };

  let onSort = (sortableField: string, ascending: boolean) => {
    setSortingField({ name: sortableField, ascending: ascending });
  };

  useEffect(() => {
    let filteredCities = [];
    for (var i = 0; i < cities.length; i++) {
      var cityObj = cities[i];
      var cityObjStr =
        cityObj["name"] +
        cityObj["state"] +
        cityObj["leisure_culture"] +
        cityObj["cost_of_living"] +
        cityObj["environmental_quality"] +
        cityObj["travel_connectivity"] +
        cityObj["population"];
      // search for text across all city attributes
      if (cityObjStr.toLowerCase().includes(searchQuery.toLowerCase())) {
        filteredCities.push(cityObj);
      }
    }
    if (sortingField) {
      sortingFunc(filteredCities, sortingField?.name, sortingField?.ascending);
    }
    setDisplayedCities(filteredCities);
  }, [searchQuery, sortingField]);

  // useEffect(() => {
  //   //go over all the cities
  //   //apply the search query (if  any)
  //   //apply the filters (if anny)
  //   //apply the sort (if any)
  // }, [searchCities,sortingFields]);

  //sort by population, search by tx, search by california
  // let searchOnClick = () => {
  //   let filteredCities = [];
  //   for (var i = 0; i < cities.length; i++) {
  //     var cityObj = cities[i];
  //     var cityObjStr = cityObj["name"] + cityObj["state"] + cityObj["leisure_culture"] + cityObj["cost_of_living"] + cityObj['environmental_quality'] + cityObj['travel_connectivity'] + cityObj['population']
  //     // search for text across all city attributes
  //     if (cityObjStr.toLowerCase().includes(searchCities.toLowerCase())) {
  //       filteredCities.push(cityObj);
  //     }
  //   }
  //   if (sortingField != null) {
  //   sortingFunc(filteredCities, sortingField?.name, sortingField?.ascending)
  //   }
  //   setDisplayedCities(filteredCities);
  // };
  // // let filterNames =[;]

  let sortingFunc = (
    possibleCities: Array<CityInstance>,
    sortableField: string,
    ascending: boolean
  ) => {
    possibleCities.sort(function (a: any, b: any) {
      if (ascending) {
        return a[sortableField] > b[sortableField] ? 1 : -1;
      } else {
        return a[sortableField] > b[sortableField] ? -1 : 1;
      }
    });
  };
  // let onSort = (sortableField: string, ascending: boolean) => {
  //   var copy = displayedCities.slice(0);
  //   copy.sort(function (a: any, b: any) {
  //     if (ascending) {
  //       return a[sortableField] > b[sortableField] ? 1 : -1;
  //     } else {
  //       return a[sortableField] > b[sortableField] ? -1 : 1;
  //     }
  //   });
  //   setSortingField({'name': sortableField, 'ascending': ascending})
  //   setDisplayedCities(copy);
  // };

  // let onFilter = (filterableField: string, option: string) => {
  //   let filteredCities: Array<CityInstance> = [];
  //   for (var i = 0; i < cities.length; i++) {
  //     var cityObj: CityInstance = cities[i];
  //     console.log((cityObj as any)[filterableField])
  //     if ((cityObj as any)[filterableField] == option) {
  //       filteredCities.push(cityObj);
  //     }
  //   }
  //   setDisplayedCities(filteredCities)
  // };

  const numPerPage = 12;
  const startIndex = numPerPage * (pageNumber - 1);
  const currentData = displayedCities.slice(
    startIndex,
    startIndex + numPerPage
  );
  var i, j;
  var chunk = 3;
  var rows = [];
  for (i = 0, j = currentData.length; i < j; i += chunk) {
    rows.push(currentData.slice(i, i + chunk));
  }
  if (loaded) {
    return (
      <div>
        <h1 className="text-align center">Cities</h1>

        <Container>
          <DropdownButton id="dropdown-basic-button" title="Sort By">
            <Dropdown.Item onClick={() => onSort("name", true)}>
              City Name (A-Z)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSort("leisure_culture", false)}>
              Leisure and Culture Score
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSort("cost_of_living", false)}>
              Cost of Living Score
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onSort("environmental_quality", false)}
            >
              Environmental Quality Score
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSort("travel_connectivity", false)}>
              Travel Connectivity Score
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSort("population", true)}>
              Population (asc)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onSort("population", false)}>
              Population (desc)
            </Dropdown.Item>
          </DropdownButton>
          <>
            {/* {filterableNames.map((variant) => (
              <DropdownButton
                as={ButtonGroup}
                variant='info'
                title={variant.name}
              >
                {variant.options.map((item) => (
                  <Dropdown.Item onClick={() => onFilter(variant['value'], item)}>{item}</Dropdown.Item>
                ))}
              </DropdownButton>
            ))} */}
          </>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl
              className="mr-sm-2"
              type="text"
              placeholder="Search Cities"
              onChange={handleSearchChange}
            />
            {/* <Button onClick={searchOnClick}></Button> */}
          </Form>

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

        <div className="row pagination">
          <Pagination
            count={Math.ceil(displayedCities.length / numPerPage)}
            page={pageNumber}
            onChange={handleChange}
          ></Pagination>
          {startIndex + 1} -{" "}
          {Math.min(startIndex + numPerPage, displayedCities?.length)} of{" "}
          {displayedCities?.length}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* <Spinner animation="border" variant="dark" 
      as="span" 
      role="status"
      aria-hidden="true"/>
      */}
        <img src={logo} alt="loading..." />
      </div>
    );
  }
}

export interface SortingAttribute {
  name: string;
  ascending: boolean;
}
export default Cities;
