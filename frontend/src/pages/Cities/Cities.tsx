import React, { useEffect, useState } from "react";
import CSS from "csstype";
import { BsCaretDown } from "react-icons/bs";
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
import "../../styles/Models.css";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import { CitiesCard } from "../../components/Card";
import logo from "../../static_resources/spinny.gif";
import citiesImg from "../../static_resources/newyork.jpg";
import { CityObject, CityInstance } from "./City";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

// Search --> be able to sort and filter based on that

// Features
// -searching --> being able to sort on that subset [WORKS]
// -pagination: fix for searching [WORKS]
// -searching only on values of just the card (grid) [WORKS]
// -Filterable
// */

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

  const [numPerPage, setNumPerPage] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [loaded, changeLoading] = useState(false);
  var states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "California",
    "Colorado",
    "Florida",
    "Georgia",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Missouri",
    "Nebraska",
    "Nevada",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Washington",
    "Washington, D.C.",
    "Wisconsin",
  ];
  var leisurescore = ["0-3", "3-6", "6-10"];
  var costscore = ["0-3", "3-6", "6-10"];

  var filterableNames = [{ name: "States", value: "states", options: states }];
  const [filteringStates, setFilteringStates] = useState<Array<String>>([]);
  const [filteringLeisure, setFilteringLeisure] = useState<Array<String>>([]);
  const [filteringCost, setFilteringCost] = useState<Array<String>>([]);

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

  const onFiltersStates = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilteringStates(event.target.value as string[]);
  };
  const onFiltersLeisure = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilteringLeisure(event.target.value as string[]);
  };

  const onFiltersCost = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilteringCost(event.target.value as string[]);
  };
  let onSort = (sortableField: string, ascending: boolean) => {
    setSortingField({ name: sortableField, ascending: ascending });
  };

  useEffect(() => {
    let filteredCities = [];
    for (var i = 0; i < cities.length; i++) {
      var cityObj = cities[i];
      var matchSearchQuery = true;
      var matchFilters = true;
      var matchLeisure = true;
      var matchCost = true;

      ///needs to be an AND operation
      if (searchQuery != "") {
        var cityObjStr =
          cityObj["name"] +
          cityObj["state"] +
          cityObj["leisure_culture"] +
          cityObj["cost_of_living"] +
          cityObj["environmental_quality"] +
          cityObj["travel_connectivity"] +
          cityObj["population"];
        // search for text across all city attributes
        if (!cityObjStr.toLowerCase().includes(searchQuery.toLowerCase())) {
          matchSearchQuery = false;
        }
      }
      if (
        filteringStates.length != 0 &&
        !filteringStates.includes(cityObj["state"])
      ) {
        matchFilters = false;
      }

      if (filteringLeisure.length != 0) {
        matchLeisure = false;

        for (let i = 0; i < filteringLeisure.length; i++) {
          var leisureRange = filteringLeisure[i].split("-");
          console.log(parseInt(leisureRange[0]));
          var low = parseFloat(leisureRange[0]);
          var high = parseFloat(leisureRange[1]);
          // console.log(typeof(low))
          // console.log(typeof(high))
          console.log(typeof cityObj["leisure_culture"]);
          if (
            low <= cityObj["leisure_culture"] &&
            cityObj["leisure_culture"] < high
          ) {
            matchLeisure = true;
          }
        }
      }
      if (filteringCost.length != 0) {
        matchCost = false;

        for (let i = 0; i < filteringCost.length; i++) {
          var costRange = filteringCost[i].split("-");
          var low = parseFloat(costRange[0]);
          var high = parseFloat(costRange[1]);
          if (
            low <= cityObj["cost_of_living"] &&
            cityObj["cost_of_living"] < high
          ) {
            matchCost = true;
          }
        }
      }

      if (matchFilters && matchSearchQuery && matchLeisure && matchCost) {
        filteredCities.push(cityObj);
      }
    }
    if (sortingField) {
      sortingFunc(filteredCities, sortingField?.name, sortingField?.ascending);
    }
    setDisplayedCities(filteredCities);
  }, [
    searchQuery,
    sortingField,
    filteringStates,
    filteringLeisure,
    filteringCost,
  ]);

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

  let updateNumPerPage = (num: number) => {
    setNumPerPage(num);
  };
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

  const headerImgStyle: CSS.Properties = {
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
    width: "100%",
    height: "500px",
    marginBottom: "0px",
    marginTop: "0px",
    display: "block",
    opacity: "0.7",
  };

  const headerTextStyle: CSS.Properties = {
    textShadow: "1px 1px 3px black",
    fontSize: "11rem",
    color: "white",
    width: "100%",
  };

  const headerCardStyle: CSS.Properties = {
    width: "100%",
    height: "auto",
  };

  const rowStyle: CSS.Properties = {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  };

  const subtitleTextStyle: CSS.Properties = {
    textShadow: "1px 1px 3px black",
    color: "white",
    width: "100%",
  };

  const buttonStyle: CSS.Properties = {
    color: "white",
    opacity: "0.7",
  };

  if (loaded) {
    return (
      <body>
        <Container fluid>
          <Row>
            <Card style={headerCardStyle}>
              <Card.Img src={citiesImg} style={headerImgStyle} />
              <Card.ImgOverlay>
                <Row className="mt-4" style={rowStyle}>
                  <Col className="text-align center">
                    <Card.Title>
                      <h1 style={headerTextStyle}>Cities</h1>
                    </Card.Title>
                  </Col>
                </Row>

                <Row style={rowStyle}>
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
                </Row>
                <Row style={rowStyle} className="mt-5">
                  <Card.Subtitle style={subtitleTextStyle}>
                    <h4>Learn more about your favorite cities below!</h4>
                  </Card.Subtitle>
                </Row>
                <Row style={rowStyle}>
                  <a href="#top" className="center-text">
                    <BsCaretDown size={75} style={buttonStyle} />
                  </a>
                </Row>
              </Card.ImgOverlay>
            </Card>
          </Row>

          <div>
            {/* <h1 className="text-align center">Cities</h1> */}
            <a id="top"></a>
            <Container>
              <div className="row" style={{ padding: 20 }}>
                <div className="col">
                  <DropdownButton id="dropdown-basic-button" title="Sort By">
                    <Dropdown.Item onClick={() => onSort("name", true)}>
                      City Name (A-Z)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("name", false)}>
                      City Name (Z-A)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("leisure_culture", true)}
                    >
                      Leisure and Culture Score (asc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("leisure_culture", false)}
                    >
                      Leisure and Culture Score (dsc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("cost_of_living", true)}
                    >
                      Cost of Living Score (asc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("cost_of_living", false)}
                    >
                      Cost of Living Score (dsc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("environmental_quality", true)}
                    >
                      Environmental Quality Score (asc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("environmental_quality", false)}
                    >
                      Environmental Quality Score (dsc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("travel_connectivity", true)}
                    >
                      Travel Connectivity Score (asc)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onSort("travel_connectivity", false)}
                    >
                      Travel Connectivity Score (dsc)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("population", true)}>
                      Population (asc)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("population", false)}>
                      Population (dsc)
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="col">
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Filter By State
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={filteringStates}
                    onChange={onFiltersStates}
                    input={<Input />}
                    renderValue={(selected) =>
                      (selected as string[]).join(", ")
                    }
                    placeholder="Filter by States"
                    // MenuProps={MenuProps}
                  >
                    {states.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={filteringStates.indexOf(name) > -1}
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col">
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Filter By Leisure Score
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={filteringLeisure}
                    onChange={onFiltersLeisure}
                    input={<Input />}
                    renderValue={(selected) =>
                      (selected as string[]).join(", ")
                    }
                    // MenuProps={MenuProps}
                  >
                    {leisurescore.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={filteringLeisure.indexOf(name) > -1}
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col">
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Filter By Cost of Living
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={filteringCost}
                    onChange={onFiltersCost}
                    input={<Input />}
                    renderValue={(selected) =>
                      (selected as string[]).join(", ")
                    }
                    // MenuProps={MenuProps}
                  >
                    {costscore.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={filteringCost.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Item Per Page"
                  >
                    <Dropdown.Item onClick={() => updateNumPerPage(6)}>
                      6
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateNumPerPage(12)}>
                      12
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => updateNumPerPage(15)}>
                      15
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>

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
        </Container>
      </body>
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
