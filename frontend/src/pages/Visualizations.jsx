import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import BarChart from "../components/Visualizations/BarChart";
import NavBarSolid from "../components/NavBarSolid";
import "../styles/Visualizations.css";
import BubbleChart from "@weknow/react-bubble-chart-d3";

import expeditionsPerCountry from "../visualizationData/providerData/expeditionsPerCountry.json";
import newsArticlesPerPublisher from "../visualizationData/providerData/newsArticlesPerPublisher.json";
import totalLaunchesPerAgency from "../visualizationData/providerData/totalLaunchesPerAgency.json";

//import CSS from "csstype";
//import BubbleChart from "../components/Visualizations/BubbleChart";

// const rowStyle: CSS.Properties = {
//   textAlign: "center",
//   alignItems: "center",
//   justifyContent: "center",
// };

function Visualizations() {
  const [key, setKey] = useState("home");
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
