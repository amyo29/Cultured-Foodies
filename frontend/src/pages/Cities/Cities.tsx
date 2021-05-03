import React, { useEffect, useState } from "react";
import { BsCaretDown } from "react-icons/bs";
import {
  Container,
  Row,
  Col,
  Card,
  DropdownButton,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import NavBarSolid from "../../components/NavBarSolid";
import FooterLarge from "../../components/FooterLarge";
import "../../styles/Cities.css";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import { CitiesCard } from "../../components/Card";
import logo from "../../static_resources/loading/spinny.gif";
import citiesImg from "../../static_resources/modelHeaders/citiesHeader.jpg";
import { CityInstance } from "./City";
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

  // var filterableNames = [{ name: "States", value: "states", options: states }];
  const [filteringStates, setFilteringStates] = useState<Array<String>>([]);
  const [filteringLeisure, setFilteringLeisure] = useState<Array<String>>([]);
  const [filteringCost, setFilteringCost] = useState<Array<String>>([]);

  //proof of concept
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data }] = useAxios("/api/cities");
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

  function formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  let handleSearchChange = (event: any) => {
    if (isNaN(event.target.value)) {
      setSearchQuery(event.target.value);
    } else {
      let number: number = event.target.value;
      setSearchQuery(formatNumber(number));
    }
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
      if (searchQuery !== "") {
        var cityObjStr =
          cityObj["name"] +
          cityObj["state"] +
          cityObj["leisure_culture"].toFixed(2) +
          cityObj["cost_of_living"].toFixed(2) +
          cityObj["environmental_quality"].toFixed(2) +
          cityObj["travel_connectivity"].toFixed(2) +
          cityObj["population"];
        // search for text across all city attributes
        if (
          !cityObjStr
            .toLowerCase()
            .includes(searchQuery.toLowerCase().replaceAll(",", ""))
        ) {
          matchSearchQuery = false;
        }
      }
      if (
        filteringStates.length !== 0 &&
        !filteringStates.includes(cityObj["state"])
      ) {
        matchFilters = false;
      }

      if (filteringLeisure.length !== 0) {
        matchLeisure = false;

        for (let i = 0; i < filteringLeisure.length; i++) {
          let leisureRange = filteringLeisure[i].split("-");
          let low = parseFloat(leisureRange[0]);
          let high = parseFloat(leisureRange[1]);
          if (
            low <= cityObj["leisure_culture"] &&
            cityObj["leisure_culture"] < high
          ) {
            matchLeisure = true;
          }
        }
      }
      if (filteringCost.length !== 0) {
        matchCost = false;

        for (let i = 0; i < filteringCost.length; i++) {
          let costRange = filteringCost[i].split("-");
          let low = parseFloat(costRange[0]);
          let high = parseFloat(costRange[1]);
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
    setPageNumber(1);
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

  if (loaded) {
    return (
      <body style={{backgroundColor: "rgb(247, 235, 221)"}}>
        <NavBarSolid />
        <Container fluid>
          <Row>
            <Card className="Cities-HeaderCardStyle">
              <Card.Img src={citiesImg} className="Cities-HeaderImgStyle" />
              <Card.ImgOverlay>
                <Row className="rowStyle mt-4">
                  <Col className="text-align center">
                    <Card.Title>
                      <h1 className="Cities-HeaderTextStyle">Cities</h1>
                    </Card.Title>
                  </Col>
                </Row>

                <Row className="Cities-rowStyle">
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
                <br />
                <Row className="rowStyle mt-4">
                  <Card.Subtitle className="Cities-subtitleTextStyle">
                    <h4>
                      {" "}
                      🌆 Wherever you are, wherever you're headed, all you want
                      to know about your city is just a click away! 🏙️{" "}
                    </h4>
                  </Card.Subtitle>
                </Row>
                <Row className="rowStyle">
                  <a href="#top" className="center-text">
                    <BsCaretDown size={75} className="buttonStyle" />
                  </a>
                </Row>
              </Card.ImgOverlay>
            </Card>
          </Row>

          <div>
            <a id="top"></a>
            <Container>
              <Row style={{ padding: 20, margin: "auto" }}>
                <Col>
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
                </Col>
                <Col>
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
                </Col>
                <Col>
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
                </Col>
                <Col>
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
                  >
                    {costscore.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={filteringCost.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </Col>
                <Col>
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
                </Col>
              </Row>

              {rows.map((cols) => (
                <Row>
                  {cols.map((city: any, i: any) => (
                    <Col className="col-sm-4 py-2">
                      <CitiesCard
                        city={city}
                        searchQuery={searchQuery}
                      ></CitiesCard>
                    </Col>
                  ))}
                </Row>
              ))}
            </Container>

            <div className="row pagination mt-4">
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
        <FooterLarge />
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
