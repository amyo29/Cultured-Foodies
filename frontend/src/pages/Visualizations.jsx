import { useState } from "react";
import { Row, Container } from "react-bootstrap";
import NavBarSolid from "../components/NavBarSolid";
import "../styles/Visualizations.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Tabs, Tab, Paper } from "@material-ui/core";
import Radar from "react-d3-radar";
import qualityOfLifeScoresPerCity from "../visualizationData/ourData/qualityOfLifeScoresPerCity.json";
import BubbleMap from "../components/Visualizations/BubbleMap";
import cuisinesSunburst from "../visualizationData/ourData/cuisinesBreakdown.json";
import Sunburst from "react-d3-zoomable-sunburst";

function Visualizations() {
  const [value, setValue] = useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const cities = qualityOfLifeScoresPerCity;
  const [currentCity, setCity] = useState(cities[0]);

  let selectCity = (index) => {
    setCity(cities[index]);
  };

  return (
    <div class="pageStyle">
      <NavBarSolid />
      <Container fluid>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Cuisines" />
          <Tab label="Restaurants" />
          <Tab label="Cities" />
        </Tabs>
        <Paper>
          {value === 0 && (
            <>
              <h3 className="text-center pt-2">
                Breakdown of Regions, Subregions, and Countries of Cuisines
              </h3>
              <p
                style={{
                  position: "relative"
                }}
              >
                <Sunburst
                  data={cuisinesSunburst}
                  scale="exponential"
                  tooltipContent={
                    <div
                      class="sunburstTooltip"
                      style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;"
                    />
                  }
                  tooltip
                  tooltipPosition="right"
                  keyId="Sunburst"
                  width={window.innerWidth * 0.8}
                  value="minSize"
                  height={window.innerHeight * 0.8}
                />
              </p>
            </>
          )}

          {value === 1 && (
            <>
              {" "}
              <h3 className="text-center pt-2">
                Number of Restaurants in Cities
              </h3>
              <Row>
                <BubbleMap class="animation"></BubbleMap>
              </Row>
            </>
          )}
          {value === 2 && (
            <>
              <h3 className="text-center pt-2">
                Quality of Life Scores for {currentCity.name},{" "}
                {currentCity.state}
              </h3>
              <div class="center">
                <DropdownButton
                  variant="info"
                  id="dropdown-variants-info"
                  title="Select City"
                >
                  {cities.map((city, index) => {
                    return (
                      <Dropdown.Item onClick={() => selectCity(index)}>
                        {city.name}, {city.state}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </div>

              <div class="center">
                <Radar
                  width={600}
                  height={600}
                  padding={100}
                  domainMax={10}
                  highlighted={null}
                  data={{
                    variables: [
                      { key: "business_freedom", label: "Business Freedom" },
                      { key: "commute", label: "Commute" },
                      { key: "cost_of_living", label: "Cost of Living" },
                      { key: "economy", label: "Economy" },
                      { key: "education", label: "Education" },
                      {
                        key: "environmental_quality",
                        label: "Environmental Quality",
                      },
                      { key: "healthcare", label: "Healthcare" },
                      { key: "housing", label: "Housing" },
                      { key: "internet_access", label: "Internet Access" },
                    ],
                    sets: [
                      {
                        key: "city",
                        label: "City",
                        values: {
                          business_freedom: currentCity.business_freedom,
                          commute: currentCity.commute,
                          cost_of_living: currentCity.cost_of_living,
                          economy: currentCity.economy,
                          education: currentCity.education,
                          environmental_quality:
                            currentCity.environmental_quality,
                          healthcare: currentCity.healthcare,
                          housing: currentCity.housing,
                          internet_access: currentCity.internet_access,
                        },
                      },
                    ],
                  }}
                />
                <Radar
                  width={600}
                  height={600}
                  padding={100}
                  domainMax={10}
                  highlighted={null}
                  data={{
                    variables: [
                      { key: "leisure_culture", label: "Leisure Culture" },
                      { key: "outdoors", label: "Outdoors" },
                      { key: "safety", label: "Safety" },
                      { key: "startups", label: "Startups" },
                      { key: "taxation", label: "Taxation" },
                      { key: "tolerance", label: "Tolerance" },
                      {
                        key: "travel_connectivity",
                        label: "Travel Connectivity",
                      },
                      { key: "venture_capital", label: "Venture Capital" },
                    ],
                    sets: [
                      {
                        key: "city",
                        label: "City",
                        values: {
                          leisure_culture: currentCity.leisure_culture,
                          outdoors: currentCity.outdoors,
                          safety: currentCity.safety,
                          startups: currentCity.startups,
                          taxation: currentCity.taxation,
                          tolerance: currentCity.tolerance,
                          travel_connectivity: currentCity.travel_connectivity,
                          venture_capital: currentCity.venture_capital,
                        },
                      },
                    ],
                  }}
                />
              </div>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Visualizations;
