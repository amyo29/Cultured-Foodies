import { React, Component } from "react";
import * as d3 from "d3";
import { geoAlbersUsa } from "d3-geo";
import { feature } from "topojson-client";
import us from "../../visualizationData/us.json";
import restaurantsPerCity from "../../visualizationData/ourData/restaurantsPerCity.json";

class BubbleMap extends Component {
  componentDidMount() {
    this.getData();
    this.drawChart();
  }
  cities = [];

  getData() {
    restaurantsPerCity.forEach((city) => {
      this.cities.push(city);
    });
  }
  drawChart() {
    // Set up the svg container
    const chart = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 960 600")
      .attr("stroke", "#fff")
      .attr("fill", "#264653")
      .classed("svg-content", true);

    // Plot all of the states
    const projection = geoAlbersUsa();
    chart
      .selectAll("g")
      .data(feature(us, us.objects.states).features)
      .enter()
      .append("path")
      .attr("class", "states")
      .attr("d", d3.geoPath().projection(projection));

    // Append the tooltip
    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Avoid confusing 'this'
    console.log(this.cities);
    let self = this;
    // Plot all of the national parks
    chart
      .selectAll("circle")
      .data(this.cities)
      .enter()
      .append("circle")
      .attr("r", function (d) {
        return (d.restaurants / 200) * 20 + 7;
      })
      .attr("fill", "#FED892")
      .attr("stroke", "#000")
      .attr("cx", function (d) {
        return projection([d.long, d.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.long, d.lat])[1];
      })
      .style("cursor", "pointer")
      .on("mouseover", function (d, i) {
        // Slightly expand the circle
        // d3.select(this)
        //   .transition()
        //   .duration(200)
        //   .attr("r", (d.restaurants / 100) * 20 + 9);
        // // Fade in the tooltip
        // div.transition().duration(200).style("opacity", 1);
        // // Set the position of the tooltip
        // div
        //   .html(d.restaurants)
        //   .style("left", d3.select(this).attr("cx") + 20 + "px")
        //   .style("top", d3.select(this).attr("cy") - 15 + "px");
      })
      .on("mouseout", function (d, i) {
        // Shrink the circle back
        // d3.select(this)
        //   .transition()
        //   .duration(200)
        //   .attr("r", (d.restaurants/ 200) * 20 + 7);

        // Fade out the tooltip
        div.transition().duration(200).style("opacity", 0);
      });
    // .on('click', function(d, i) {
    //   self.setState({park: d});
    //   d3.selectAll('circle').transition(.2).duration(100).attr('fill', '#FED892');
    //   d3.select(this).transition(.2).duration(100).attr('fill', '#2A9D8F');
    // });
  }
  render() {
    return <div ref="canvas" className="col-md-9"></div>;
  }
}

export default BubbleMap;
