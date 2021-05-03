import { Component } from "react";
import * as d3 from "d3";

/**
 * 	Bar chart visualization used to present data for ours and
 * 	providers
 * 	Used code from D3.js
 */
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    //format the margin and size
    const margin = { top: 100, right: 20, bottom: 150, left: 130 };
    const height = 600 - margin.top - margin.bottom;
    const width = 1400 - margin.left - margin.right;
    const padding = -110;

    const svg = d3
      .select(this.refs.barChart)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .style("color", "black")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //getting the data from input file
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(this.props.data.map((d) => d[this.props.xAttr]))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "black")
      .style("font-family", "Josefin Sans")
      .style("font-size", "16");

    const maxValue = Math.max(
      ...this.props.data.map((d) => d[this.props.yAttr])
    );
    const y = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxValue / 10) * 10])
      .range([height, 0]);
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "black")
      .style("font-family", "Josefin Sans")
      .style("font-size", "16");

    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("font-family", "Josefin Sans")
      .style("font-weight", "550")
      .style("position", "absolute")
      .style("display", "none")
      .style("min-width", "80px")
      .style("height", "auto")
      .style("background", "none repeat scroll 0 0 #ffffff")
      .style("border", "1px solid #6F257F")
      .style("padding", "14px")
      .style("text-align", "center");
    svg
      .selectAll("mybar")
      .data(this.props.data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[this.props.xAttr]))
      .attr("y", (d) => y(d[this.props.yAttr]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d[this.props.yAttr]))
      .attr("fill", "brown")
      .on("mouseover", function () {
        d3.select("#tooltip").transition().duration(200).style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        d3.select("#tooltip")
          .style("left", event.pageX - 50 + "px")
          .style("top", event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html(d.expeditions);
      })
      .on("mouseout", function (d) {
        d3.select("#tooltip").style("opacity", 0);
      });

    // Now add titles to the axes
    svg
      .append("text")
      .attr("text-anchor", "middle")
      // This makes it easy to centre the text
      .attr(
        "transform",
        "translate(" + padding / 1.5 + "," + height / 2 + ")rotate(-90)"
      )
      // Text is drawn off the screen top left
      .text(this.props.yLabel)
      .attr("fill", "black")
      .style("font-family", "Josefin Sans")
      .style("font-size", "24");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + width / 2 + "," + (height + 100) + ")")
      .text(this.props.xLabel)
      .attr("fill", "black")
      .style("font-family", "Josefin Sans")
      .style("font-size", "24");
  }

  render() {
    return <div ref="barChart"></div>;
  }
}
export default BarChart;
