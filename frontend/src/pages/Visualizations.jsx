import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import BarChart from "../components/Visualizations/BarChart";
import NavBarSolid from "../components/NavBarSolid";
import "../styles/Visualizations.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

import BubbleChart from "@weknow/react-bubble-chart-d3";
import Radar from "react-d3-radar";

import qualityOfLifeScoresPerCity from "../visualizationData/ourData/qualityOfLifeScoresPerCity.json";

import expeditionsPerCountry from "../visualizationData/providerData/expeditionsPerCountry.json";
import newsArticlesPerPublisher from "../visualizationData/providerData/newsArticlesPerPublisher.json";
import totalLaunchesPerAgency from "../visualizationData/providerData/totalLaunchesPerAgency.json";
import BubbleMap from "../components/Visualizations/BubbleMap";

//import CSS from "csstype";
//import BubbleChart from "../components/Visualizations/BubbleChart";

// const rowStyle: CSS.Properties = {
//   textAlign: "center",
//   alignItems: "center",
//   justifyContent: "center",
// };

function Visualizations() {
  const [key, setKey] = useState("home");

  const cities = qualityOfLifeScoresPerCity;
  const [currentCity, setCity] = useState(cities[0]);

  let selectCity = (index) => {
    setCity(cities[index]);
  };

  return (
    <div>
      <NavBarSolid />
      <Container fluid>
        <Row class="center">
          <h1 class="custom1">Visualizations</h1>
        </Row>
        <Row class="center">
          <h2 class="custom1">Our Data</h2>
        </Row>
        <Row class="center">
          <h3 class="custom1">Number of restaurants in each city</h3>
          <BubbleMap></BubbleMap>
        </Row>
        <Row class="center">
          <h3 class="custom1">
            Quality of Life Scores for {currentCity.name}, {currentCity.state}
          </h3>
          <DropdownButton id="dropdown-basic-button" title="Select City">
            {cities.map((city, index) => {
              return (
                <Dropdown.Item onClick={() => selectCity(index)}>
                  {city.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Row>
        <Row class="center">
          <Row class="center">
            <Radar
              width={500}
              height={500}
              padding={70}
              domainMax={10}
              highlighted={null}
              // onHover={(point) => {
              //   if (point) {
              //     console.log("hovered over a data point");
              //   } else {
              //     console.log("not over anything");
              //   }
              // }}
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
                      environmental_quality: currentCity.environmental_quality,
                      healthcare: currentCity.healthcare,
                      housing: currentCity.housing,
                      internet_access: currentCity.internet_access,
                    },
                  },
                ],
              }}
            />
          </Row>
          <Row class="center">
            <Radar
              width={500}
              height={500}
              padding={70}
              domainMax={10}
              highlighted={null}
              // onHover={(point) => {
              //   if (point) {
              //     console.log("hovered over a data point");
              //   } else {
              //     console.log("not over anything");
              //   }
              // }}
              data={{
                variables: [
                  { key: "leisure_culture", label: "Leisure Culture" },
                  { key: "outdoors", label: "Outdoors" },
                  { key: "safety", label: "Safety" },
                  { key: "startups", label: "Startups" },
                  { key: "taxation", label: "Taxation" },
                  { key: "tolerance", label: "Tolerance" },
                  { key: "travel_connectivity", label: "Travel Connectivity" },
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
          </Row>
        </Row>
        <Row class="center">
          <h2 class="custom1">Provider Data</h2>
        </Row>
        <Row class="center">
          <h3 class="custom1">Expeditions per country</h3>
          <Row class="center">
            <BarChart
              data={expeditionsPerCountry}
              xAttr="country"
              yAttr="expeditions"
              xLabel="Countries"
              yLabel="Expeditions"
            />
          </Row>
        </Row>
        <Row class="center">
          <h3 class="custom1">News stories per publisher</h3>
          <Row class="center">
            <BubbleChart
              width={1000}
              height={800}
              data={newsArticlesPerPublisher}
            />
          </Row>
        </Row>
        <Row class="center">
          <h3 class="custom1">Total launches per agency</h3>
          <Row class="center">
            <BubbleChart
              width={1000}
              height={800}
              data={totalLaunchesPerAgency}
            />
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Visualizations;
