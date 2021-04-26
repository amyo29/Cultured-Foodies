import React, { useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import expeditionsPerCountry from "../visualizationData/providerData/expeditionsPerCountry.json";
import newsArticlesPerPublisher from "../visualizationData/providerData/newsArticlesPerPublisher.json";
import totalLaunchesPerAgency from "../visualizationData/providerData/totalLaunchesPerAgency.json";
import { Tabs, Tab, Paper } from "@material-ui/core";
import NavBarSolid from "../components/NavBarSolid";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import BarChart from "../components/Visualizations/BarChart";

function ProviderVisualizations() {
  const [value, setValue] = useState(0);
  const handleChange = (event, value) => {
    setValue(value);
    console.log("v", value);
  };
  return (
    <div>
      <NavBarSolid />
      <Container fluid>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Agencies" />
          <Tab label="Expeditions" />
          <Tab label="News Stories" />
        </Tabs>
        <Paper>
          {value == 0 && (
            <>
              <h3>Total launches per agency</h3>
              <div class="center">
                <BubbleChart
                  width={900}
                  height={900}
                  data={totalLaunchesPerAgency}
                />
              </div>
            </>
          )}
          {value == 1 && (
            <>
              <h3>Space Expeditions Per Country</h3>
              <Row>
                <BarChart
                  data={expeditionsPerCountry}
                  xAttr="country"
                  yAttr="expeditions"
                  xLabel="Countries"
                  yLabel="Expeditions"
                />
              </Row>
            </>
          )}
          {value == 2 && (
            <>
              <h3>News stories per publisher</h3>
              <div class="center">
                <BubbleChart
                  width={900}
                  height={900}
                  data={newsArticlesPerPublisher}
                />
              </div>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}
export default ProviderVisualizations;
