import React from 'react';
import BubbleChart from "@weknow/react-bubble-chart-d3";

function BubbleChartFunc () {
  return (
    <BubbleChart
      width={1000}
      height={800}
      legendFont={{
        family: "Arial",
        size: 12,
        color: "#000",
        weight: "bold",
      }}
      valueFont={{
        family: "Arial",
        size: 24,
        color: "#fff",
        weight: "bold",
        lineColor: "#3f3f3f",
        lineWeight: 2,
      }}
      data={[
        { label: "CRM", value: 1 },
        { label: "API", value: 1 },
        { label: "Data", value: 1 },
        { label: "Commerce", value: 1 },
        { label: "AI", value: 3 },
        { label: "Management", value: 5 },
        { label: "Testing", value: 6 },
        { label: "Mobile", value: 9 },
        { label: "Conversion", value: 9 },
        { label: "Misc", value: 21 },
        { label: "Databases", value: 22 },
        { label: "DevOps", value: 22 },
        { label: "Javascript", value: 23 },
        { label: "Languages / Frameworks", value: 25 },
        { label: "Front End", value: 26 },
        { label: "Content", value: 26 },
      ]}
    />
  );
}

export default BubbleChartFunc;
