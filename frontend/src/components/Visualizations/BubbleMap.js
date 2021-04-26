import { React, Component } from "react";
import * as d3 from "d3";
import { geoAlbersUsa } from "d3-geo";
import { feature } from "topojson-client";
import us from "../../visualizationData/us.json";
import restaurantsPerCity from "../../visualizationData/ourData/restaurantsPerCity.json";
import { CitiesCard } from "../../components/Card";

const API_ENDPOINT = "https://www.culturedfoodies.me/api/cities/id=";

class BubbleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      city: null,
    };
  }
  componentDidMount() {
    this.getData();
    this.drawChart();
  }

  getData() {
    restaurantsPerCity.forEach((city) => {
      this.state.cities.push(city);
    });
    // this.setState({city: this.data})
  }
  setData(id) {
    fetch(API_ENDPOINT + id)
      .then((resp) => resp.json())
      .then((data) => {
        // Process data
        this.setState({ city: data });
      });
  }
  drawChart() {
    // Set up the svg container
    const chart = d3
      .select("#my_dataviz")
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

    // create a tooltip
    var toolTip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("style", "position: absolute; opacity: 0;")
      .style("background-color", "rgb(247, 235, 221)")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("font-family", "Josefin Sans")
      .style("font-weight", "550");

    let self = this;
    // Add circles:
    chart
      .selectAll("myCircles")
      .data(this.state.cities)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.long, d.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.long, d.lat])[1];
      })
      .attr("r", function (d) {
        return d.restaurants / 5;
      })
      .attr("class", "circle")
      .style("fill", "69b3a2")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 3)
      .attr("fill-opacity", 0.4)
      .on("mouseover", function () {
        d3.select("#tooltip").transition().duration(200).style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        d3.select("#tooltip")
        .html("City: " + d.city + "<br>" + "Restaurants: " + d.restaurants)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + "px");
      })
      .on("mouseout", function () {
        d3.select("#tooltip").style("opacity", 0);
      })
      .on("click", function (event, d) {
        self.setData(d.id);
        d3.selectAll("circle")
          .transition(0.2)
          .duration(100)
          .attr("fill", "#264653");
        d3.select(this).transition(0.2).duration(100).attr("fill", "#FED892");
      });
  }
  render() {
    return (
      <>
        <div id="my_dataviz" className="col-md-9"></div>
        <div className="col-md-2 instance-container align-self-center">
          {this.state.city === null ? (
            <h4>Click a City to explore!</h4>
          ) : (
            <CitiesCard city={this.state.city} searchQuery={""} />
          )}
        </div>
      </>
    );
  }
}

export default BubbleMap;
