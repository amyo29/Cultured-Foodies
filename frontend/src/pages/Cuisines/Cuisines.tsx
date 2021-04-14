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
} from "react-bootstrap";
import useAxios from "axios-hooks";
import { Pagination } from "@material-ui/lab";
import { CountryInstance, CuisineInstance } from "./Cuisine";
import axios from "axios";
import { CuisinesCard } from "../../components/Card";
import load from "../../static_resources/spinny donut.gif";
import headerimg from "../../static_resources/cuisineimg1.jpg";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
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
  const [filteringSubRegions, setFilteringSubRegions] = useState<Array<String>>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [loaded, changeLoading] = useState(false);
  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };
  const [{ data, loading, error }] = useAxios("/api/cuisines");
  var regions_options = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  var subregions_options = ["Southern Asia","Southern Europe","Northern America","South America","Western Asia","Australia and New Zealand","Western Europe","Northern Europe", "South-Eastern Asia", "Eastern Asia","Caribbean", "Central America","Eastern Africa","Eastern Europe","Northern Africa", "Western Africa","Southern Africa", "Central Asia"]
  useEffect(() => {
    if (data) {
      setCuisines(data.cuisines);
      setDisplayedCuisines(data.cuisines);
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

  let handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
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
      var subregions_list: Array<String> =[];
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
            countryObj["population"] +
            countryObj["area"];
        });
      if (searchQuery != "") {
        if (!cuisineObjStr.toLowerCase().includes(searchQuery.toLowerCase())) {
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
      if (filteringSubRegions.length != 0 ) {
        const subregionIntersection = subregions_list.filter((x) =>
          filteringSubRegions.includes(x)
        )
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

  const numPerPage = 12;
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
        <Row>
          <Card className="header-card">
            <Card.Img src={headerimg} className="header-img" />
            <Card.ImgOverlay>
              <Row className="mt-5" style={{ justifyContent: "center" }}>
                <Col className="text-align center">
                  <Card.Title>
                    <h1 className="header-text">Cuisines</h1>
                  </Card.Title>
                </Col>
              </Row>
              <Row className="mt-4" style={{ justifyContent: "center" }}>
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
            </Card.ImgOverlay>
          </Card>
        </Row>

        {/* <h1 className="text-align center">Cuisines</h1> */}
        <Container>
          <div className="row" style={{ padding: 20 }}>
            <div className="col">
              <DropdownButton id="dropdown-basic-button" title="Sort By">
                <Dropdown.Item onClick={() => onSort("name", true)}>
                  Cuisine Name (A-Z)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort("name", false)}>
                  Cuisine Name (Z-A)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort("country", true)}>
                  Country of Origin
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort("region", true)}>
                  Origin Country's Region
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort("capital", true)}>
                  Origin Country's Capitals
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort("population", true)}>
                  Origin Country's Population (asc)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onSort("area", true)}>
                  Origin Country's Area (asc)
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="col">
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
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  // MenuProps={MenuProps}
                >
                  {regions_options.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={filteringRegions.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="col">
              <div>
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
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {subregions_options.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={filteringSubRegions.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {rows.map((cols) => (
            <Row>
              {cols.map((cuisine: any, i: any) => (
                <Col className="col-sm-4 py-2">
                  <CuisinesCard
                    cuisine={cuisine}
                    countries={countries}
                    loaded={loaded}
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

