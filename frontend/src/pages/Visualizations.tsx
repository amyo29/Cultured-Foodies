import React from "react";
import fakeData from "../vizualization_data/very_fake_data.json";
import BarChart from "../components/Visualizations/BarChart";
import NavBarSolid from "../components/NavBarSolid";

function Visualizations() {
  return (
    <div>
       <NavBarSolid />
      Visualizations
      <BarChart
        data={fakeData}
        xAttr="country"
        yAttr="emissions"
        xLabel="Countries"
        yLabel="Carbon Emissions (ppm)"
      />
    </div>
  );
}

export default Visualizations;
