import { React, Component } from "react";
import * as d3 from "d3";
import { geoAlbersUsa } from "d3-geo";
import { feature } from "topojson-client";
import us from "../../visualizationData/us.json";
import restaurantsPerCity from "../../visualizationData/ourData/restaurantsPerCity.json";
import {CitiesCard} from "../../components/Card";

class BubbleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      city: null,
      data: {business_freedom: 8.671,
        commute: 5.5192499999999995,
        cost_of_living: 2.342,
        cuisine_ids: "84, 47, 10, 98, 70, 32, 20, 23, 39, 74, 58, 91, 11, 36, 2, 92, 3, 59, 34, 66, 22, 54, 5, 12, 55, 37, 7, 9, 50, 57, 101, 61, 33, 85, 80, 81, 65, 69, 28, 46, 95, 41, 49, 21, 73, 76, 18, 19, 77, 53, 86, 87, 100",
        cuisines: "Sri Lankan, Italian, Bangladeshi, Venezuelan, Punjabi, French, Cantonese, Chinese, Hong Kong, Scandinavian, Nepalese, Tibetan, Belgian, Guyanese, Albanian, Trinidad And Tobago, American, New American, German, Peruvian, Chilean, Mexican, Argentine, Bolivian, Moldovan, Haitian, Australian, Balearic, Jewish, Moroccan, Yemeni, New Zealand, Georgian, Swedish, South African, Southern, Paraguayan, Puerto Rican, Dominican, Israeli, Ukrainian, Icelandic, Japanese, Caribbean, Saudi Arabian, Sichuan, Cambodian, Canadian, Singaporean, Malaysian, Swiss, Syrian, Welsh",
        economy: 6.5145,
        education: 8.0935,
        environmental_quality: 5.233749999999999,
        full_name: "New York City, New York, United States",
        healthcare: 8.501666666666665,
        housing: 1,
        id: 113,
        imagesmobile: "https://d13k13wj6adfdf.cloudfront.net/urban_areas/new-york-9cb6cc2ae5.jpg",
        imagesweb: "https://d13k13wj6adfdf.cloudfront.net/urban_areas/new-york_web-99d9bb0809.jpg",
        internet_access: 7.0985,
        latitude: 40,
        leisure_culture: 10,
        longitude: -74,
        name: "New York City",
        outdoors: 5.7475,
        population: 8175133,
        restaurant_ids: "55, 71, 109, 212, 276, 283, 333, 365, 369, 396, 460, 470, 530, 549, 587, 703, 706, 786, 839, 842, 856, 929, 955, 967, 1000, 1037, 1044, 1092, 1095, 1117, 1180, 1192, 1199, 1216, 1285, 1299, 1337, 1342, 1389, 1462, 1511, 1512, 1554, 1613, 1628, 1678, 1710, 1752, 1755, 1758, 1776, 1803, 1869, 1891, 1972, 1976, 2008, 2009, 2026, 2145, 2154, 2177, 2191, 2198, 2237, 2265, 2297, 2311, 2319, 2352, 2381, 2470, 2492, 2499, 2511, 2667, 2702, 2759, 2837, 2903, 2970, 2995, 3010, 3022, 3033, 3067, 3137, 3165, 3280, 3356, 3370, 3418, 3497, 3560, 3563, 3567, 3792, 3851, 3931, 3974, 3997, 4038, 4049, 4129, 4137, 4168, 4173, 4224, 4233, 4250, 4301, 4349, 4355, 4461, 4536, 4538, 4556, 4579, 4598, 4674, 4721, 4766, 4824, 4864, 4897, 4928, 4954, 5013, 5039, 5082, 5097, 5190, 5233, 5236, 5277, 5304, 5325, 5345, 5358, 5359, 5360, 5361, 5362, 5363, 5364, 5365, 5366, 5367, 5368, 5369",
        restaurants: "SanRasa Restaurant, Babbo, Royal Bangladesh Indian Restaurant, Caracas Arepa Bar, Punjabi Kabab House, Daniel, Mr. Tong, Hong Kong Kitchen, Smorgas Chef at Scandinavia House, Tao, Sohna Punjab Indian Restaurant, Himalayan Yak, Il Giglio, Punjabi Dhaba Indian Restaurant, Petite Abeille, Guyana's Brown Betty, Albanian Grocery, Caracas Arepa Bar, Trinidad Golden Place Restaurant, Shake Shack, John's Pizza of Times Square, Lakruwana Restaurant, Max Brenner New York, Ping Seafood Restaurant, Café Select, The Meatball Shop, New Ranglla Punjab Indian Restaurant, Dil e Punjab Deli, Hong Kong Chinese Restaurant, Punjabi Virsa, Yerba Buena Perry, Cafe Katja, Cafe Hong Kong, The Bolivian Llama Party, Taureau, Hong Kong, BXL Cafe, Moldova Restaurant, Lombardi's Pizza, Nio's Trinidad Roti Shop, Amazing 66, Golden Punjab Indian Restaurant, Immaculee II Haitian Restaurant & Bakery, Dong Chun Hong, Trinidad Roti & West Indian, Hong Kong Restaurant, The Thirsty Koala, Balery Cafe, Mile End Delicatessen, The Halal Guys, Sadelle's, Hong Kong Street Cart, Grimaldi's Pizzeria, Public, El Cocotero, Bite of Hong Kong, Shake Shack, Punjabi Grocery & Deli, Balthazar, Big Wong, Joe's Shanghai, Traif, Becco, Yemen Cuisine, Peter Luger Steak House, Little Pepper, Golden Unicorn, Gramercy Tavern, Yemen Café and Restaurant, Clinton Street Baking Company, The Musket Room, Congee Village, Toné Café - Georgian Bakery & Cuisine, Fika, 5 Napkin Burger, Cafeteria, Arepas Café, Braai, Zeng Chang Hong, Yonah Schimmel's Knish Bakery, King's Wok Chinese Restaurant, Mapo Tofu, Hong Kong Express, Hong Kong Noodle, Eleven Madison Park, Guyana's Choice Bakery, Bagladeshi Cafe & Mart, Per Se, Punjab Restaurant, Hong Kong Restaurant, S'MAC, New Punjabi Kabob House, Sammy's Roumanian Steakhouse, Dinosaur Bar-B-Que, Hoy Wong Restaurant, Nio's Trinidad Roti Truck, Ali's Trinidad Roti Shop, Carmine's Italian Restaurant - Times Square, Vegetarian Dim Sum House, Punjabi Deli & Pizza, Junior's Restaurant, New Yung Hong Chinese Takeout, I Love Paraguay Restaurant, Empire Diner, New Hong Kong House, La Casa Del Mofongo, Oriental Garden, 2 Duck Goose, Shake Shack, New Asha, Masala Guyanese Kitchen, Le Bernardin, Renacer Bolivian, Yemen Restaurant, Mi Bolivia, Yemen Café, Jack's Wife Freda, Tuck Shop, Ho Wan Restaurant, Veselka, Icelandic Fish And Chips, Five Leaves, Excellent Dumpling House, Buddakan, Nobu, Olivia's Restaurant & Lounge, Trinidad Roti Shop, Mamajuana Café, Sohna Punjab Indian Cuisine & Bar, Arabian Nights, Malecón Restaurant, Pommes Frites, China Chalet, Bolivian Llama Party, Punjabi Sweets & Restaurant, Boon by Moldova, Malecón Restaurant, Cafe Steinhof, Num Pang Sandwich Shop, Num Pang Sandwich Shop, Num Pang Sandwich Shop, UpNorth, Chomp Chomp, Yummy Tummy Asian Bistro, Singapore Malaysia Beef Jerky, Bugis Street Brasserie and Bar Times Square, Café Select, Dar 525, Kubeh, Longbow Pub & Pantry",
        safety: 7.022,
        startups: 10,
        state: "New York",
        taxation: 3.9205,
        timezone: "America/New_York",
        tolerance: 6.7125,
        travel_connectivity: 6.675,
        venture_capital: 10}
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
  setData(){
    this.setState({city: this.state.data});
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
      .attr("d", d3.geoPath().projection(projection))

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
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select("#tooltip").transition().duration(200).style("opacity", 1);

        d3.select("#tooltip")
          .html(
            "City: "+
            d.city +
              "<br>" +
              "Restaurants: " +
              d.restaurants
          )
          .style("left", (event.pageX + 20) + "px")
          .style("top", (event.pageY - 15) + "px");
      })
      .on("mouseout", function () {
        d3.select("#tooltip").style("opacity", 0);
      })
      .on('click', function(d) {
        self.setData();
        d3.selectAll('circle').transition(.2).duration(100).attr('fill', '#264653');
        d3.select(this).transition(.2).duration(100).attr('fill', '#FED892');
      });
  }
  render() {
    console.log("Here:", this.state.city)
    return (
      <>
    <div id="my_dataviz" className="col-md-9"></div>
    <div className="col-md-2 instance-container align-self-center">
              {this.state.city === null ? (
                <h4>Click a City to explore!</h4>
              ) : (
                <CitiesCard
                  city = {this.state.city}
                  searchQuery={""}
                />
              )}
  </div>
  </>
    );
  }
}

export default BubbleMap;
