import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  DropdownButton,
  Dropdown,
  Form,
  FormControl,
  Spinner,
} from "react-bootstrap";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import NavBarSolid from "../../components/NavBarSolid";
import { CountryInstance, CuisineInstance } from "./Cuisine";
import axios from "axios";
import "../../styles/Cuisines.css";
import { CuisinesCard } from "../../components/Card";
import load from "../../static_resources/spinny donut.gif";
import headerimg from "../../static_resources/cuisineimg8.jpg";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Highlighter from "react-highlight-words";

function Countries() {
  useEffect(() => {
    document.title = "Cuisines";
  }, []);
  const [cuisines, setCuisines] = useState<Array<CuisineInstance>>([]);
  const [countries, setCountries]: any = useState({});

  const [displayedCuisines, setDisplayedCuisines] = useState<
    Array<CuisineInstance>
  >([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortingField, setSortingField] = useState<SortingAttribute>();
  const [filteringRegions, setFilteringRegions] = useState<Array<String>>([]);
  const [filteringSubRegions, setFilteringSubRegions] = useState<Array<String>>(
    []
  );

  const [numPerPage, setNumPerPage] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  const [loaded, changeLoading] = useState(false);
  const [loadedCards, changeLoadingCards] = useState(false);
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios("/api/cuisines");
  var regions_options = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  var subregions_options = [
    "Southern Asia",
    "Southern Europe",
    "Northern America",
    "South America",
    "Western Asia",
    "Australia and New Zealand",
    "Western Europe",
    "Northern Europe",
    "South-Eastern Asia",
    "Eastern Asia",
    "Caribbean",
    "Central America",
    "Eastern Africa",
    "Eastern Europe",
    "Northern Africa",
    "Western Africa",
    "Southern Africa",
    "Central Asia",
  ];
  useEffect(() => {
    if (data) {
      setCuisines(data.cuisines);
      setDisplayedCuisines(data.cuisines);
      changeLoadingCards(true);
    }
  }, [data]);

  useEffect(() => {
    axios.get("/api/countries").then((value) => {
      let all_countries = value["data"]["countries"];
      let dict_countries: any = {};
      all_countries.forEach(function (country: any) {
        let id: number = country["id"];
        dict_countries[id] = country;
      });
      setCountries(dict_countries);
      changeLoading(true);
    });
  });

  function formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  let handleSearchChange = (event: any) => {
    if (isNaN(event.target.value)) {
      setSearchQuery(event.target.value);
    } else {
      let number: number = event.target.value;
      setSearchQuery(formatNumber(number));
      console.log(formatNumber(number));
    }
  };

  const onFiltersRegion = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilteringRegions(event.target.value as string[]);
  };

  const onFiltersSubRegion = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilteringSubRegions(event.target.value as string[]);
  };

  let onSort = (sortableField: string, ascending: boolean) => {
    setSortingField({ name: sortableField, ascending: ascending });
  };

  let retrieveCountryField = (
    cuisineObj: CuisineInstance,
    countryField: string
  ) => {
    var results = [];
    var countryIDs = cuisineObj["countryID"].split(", ");
    for (var i = 0; i < countryIDs.length; i++) {
      var cId = countryIDs[i];
      results.push(countries[parseInt(cId)][countryField]);
    }
    return results;
  };
  useEffect(() => {
    let filteredCuisines: Array<CuisineInstance> = [];
    for (var i = 0; i < cuisines.length; i++) {
      var cuisineObj = cuisines[i];
      var regions_list: Array<String> = [];
      var subregions_list: Array<String> = [];
      var populations_list: Array<number> = [];
      var matchSearchQuery = true;
      var matchFilters = true;
      ///needs to be an AND operation
      var cuisineObjStr = cuisineObj["name"] + cuisineObj["country"];
      var countriesObj = cuisineObj["countryID"]
        .split(",")
        .forEach(function (countryID: string) {
          var countryObj = countries[parseInt(countryID)];
          regions_list.push(countryObj["region"]);
          subregions_list.push(countryObj["subregion"]);
          populations_list.push(countryObj["population"]);
          cuisineObjStr +=
            countryObj["capital"] +
            countryObj["region"] +
            countryObj["subregion"] +
            countryObj["population"] +
            countryObj["area"];
        });
      // console.log(cuisineObjStr)
      if (searchQuery != "") {
        if (
          !cuisineObjStr
            .toLowerCase()
            .includes(searchQuery.toLowerCase().replaceAll(",", ""))
        ) {
          matchSearchQuery = false;
        }
      }
      if (filteringRegions.length != 0) {
        const intersection = regions_list.filter((x) =>
          filteringRegions.includes(x)
        );
        if (intersection.length == 0) {
          matchFilters = false;
        }
      }
      if (filteringSubRegions.length != 0) {
        const subregionIntersection = subregions_list.filter((x) =>
          filteringSubRegions.includes(x)
        );
        if (subregionIntersection.length == 0) {
          matchFilters = false;
        }
      }

      if (matchFilters && matchSearchQuery) {
        filteredCuisines.push(cuisineObj);
      }
    }

    if (sortingField) {
      sortingFunc(
        filteredCuisines,
        sortingField?.name,
        sortingField?.ascending
      );
    }
    setPageNumber(1);
    setDisplayedCuisines(filteredCuisines);
  }, [searchQuery, sortingField, filteringRegions, filteringSubRegions]);

  let sortingFunc = (
    possibleCuisines: Array<CuisineInstance>,
    sortableField: string,
    ascending: boolean
  ) => {
    if (sortableField == "name" || sortableField == "country") {
      possibleCuisines.sort(function (a: any, b: any) {
        if (ascending) {
          return a[sortableField] > b[sortableField] ? 1 : -1;
        } else {
          return a[sortableField] > b[sortableField] ? -1 : 1;
        }
      });
    } else {
      //sortableField is capital
      possibleCuisines.sort(function (a: any, b: any) {
        var aList = retrieveCountryField(a, sortableField);
        aList.sort();
        var bList = retrieveCountryField(b, sortableField);
        bList.sort();
        var aCountryFieldMax = aList[aList.length - 1];
        var bCountryFieldMax = bList[bList.length - 1];
        if (ascending) {
          return aCountryFieldMax > bCountryFieldMax ? 1 : -1;
        } else {
          return aCountryFieldMax > bCountryFieldMax ? -1 : 1;
        }
      });
    }
  };

  let updateNumPerPage = (num: number) => {
    setNumPerPage(num);
  };
  const startIndex = numPerPage * (pageNumber - 1);
  const currentData = displayedCuisines.slice(
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
      <body>
        <NavBarSolid />
        <Row>
          <Card className="headerCardStyle">
            <Card.Img src={headerimg} className="headerImgStyle"/>
            <Card.ImgOverlay>
              <Row className="rowStyle mt-4">
                <Card.Title>
                  <h1 className="headerTextStyle">Cuisines</h1>
                </Card.Title>
              </Row>
              <Row className="rowStyle">
                <Form
                  inline
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <FormControl
                    className="mr-sm-2"
                    type="text"
                    placeholder="Search Cuisines"
                    onChange={handleSearchChange}
                  />
                  {/* <Button onClick={searchOnClick}></Button> */}
                </Form>
              </Row>
              <Row className="rowStyle mt-5">
                <Card.Subtitle className="subtitleTextStyle">
                  <h4> 🌎 Worldwide food for thought 💭</h4>
                  <h5>
                    {" "}
                    🍔 🍕 🌮 🌯 🫔 🥙 🥘 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🥮
                    🍡 🥟 🍬 🍭 🍮{" "}
                  </h5>
                </Card.Subtitle>
              </Row>
            </Card.ImgOverlay>
          </Card>
        </Row>

        {/* <h1 className="text-align center">Cuisines</h1> */}
        {loadedCards ? (
          <>
            <Container>
              <Row style={{ padding: 20 }}>
                <Col>
                  <DropdownButton id="dropdown-basic-button" title="Sort By">
                    <Dropdown.Item onClick={() => onSort("name", true)}>
                      Cuisine Name (A-Z)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("name", false)}>
                      Cuisine Name (Z-A)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("country", true)}>
                      Country of Origin (A-Z)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("country", false)}>
                      Country of Origin (Z-A )
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("region", true)}>
                      Origin Country's Region (A-Z)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("region", false)}>
                      Origin Country's Region (Z-A)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("capital", true)}>
                      Origin Country's Capitals (A-Z)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("capital", false)}>
                      Origin Country's Capitals (Z-A)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("population", true)}>
                      Origin Country's Population (asc)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("population", false)}>
                      Origin Country's Population (dsc)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("area", true)}>
                      Origin Country's Area (asc)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onSort("area", false)}>
                      Origin Country's Area (dsc)
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col>
                  <div>
                    <InputLabel id="demo-mutiple-checkbox-label">
                      Filter by Regions
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={filteringRegions}
                      onChange={onFiltersRegion}
                      input={<Input />}
                      renderValue={(selected) =>
                        (selected as string[]).join(", ")
                      }
                      // MenuProps={MenuProps}
                    >
                      {regions_options.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={filteringRegions.indexOf(name) > -1}
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col>
                  <Col>
                    <InputLabel id="demo-mutiple-checkbox-label">
                      Filter by Subregions
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={filteringSubRegions}
                      onChange={onFiltersSubRegion}
                      input={<Input />}
                      renderValue={(selected) =>
                        (selected as string[]).join(", ")
                      }
                    >
                      {subregions_options.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={filteringSubRegions.indexOf(name) > -1}
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </Col>
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
                  {cols.map((cuisine: any, i: any) => (
                    <Col className="col-sm-4 py-2">
                      <CuisinesCard
                        cuisine={cuisine}
                        countries={countries}
                        loaded={loaded}
                        searchQuery={searchQuery}
                      ></CuisinesCard>
                    </Col>
                  ))}
                </Row>
              ))}
            </Container>
            <div className="row pagination">
              <Pagination
                count={Math.ceil(displayedCuisines.length / numPerPage)}
                page={pageNumber}
                onChange={handleChange}
              ></Pagination>
              {startIndex + 1} -{" "}
              {Math.min(startIndex + numPerPage, displayedCuisines?.length)} of{" "}
              {displayedCuisines?.length}
            </div>
          </>
        ) : (
          <Row className="rowStyle">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Row>
        )}
        {/* <Footer></Footer> */}
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
        <img src={load} alt="loading..." />
      </div>
    );
  }
}
//mobile for card, web for instance page
export default Countries;
export interface SortingAttribute {
  name: string;
  ascending: boolean;
}
