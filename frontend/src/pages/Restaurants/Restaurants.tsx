import React, { useEffect, useState } from "react";
import CSS from 'csstype';
import { Card, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import "../../styles/Restaurants.css";
import useAxios from "axios-hooks";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import logo from "../../static_resources/dumpling.gif";
import restImg from "../../static_resources/restaurantimg1.jpg";
import small from "../../static_resources/smaller dumpling.gif";
import { RestaurantInstance } from "./Restaurant";
import { resolveConfig } from "prettier";

function Restaurants() {
  useEffect(() => {
    document.title = "Restaurants";
  }, []);

  const [restaurants, setRestaurants] = useState<Array<RestaurantInstance>>([]);
  const [loaded, changeLoading] = useState(false);
  const [{ data, loading, error }] = useAxios("/api/restaurants");

  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants);
      changeLoading(true);
    }
  }, [data]);

  const history = useHistory();

  const routeChange = (id: string) => {
    let path = "/restaurants/" + id;
    console.log(path);
    history.push(path);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ["A-F", "G-L", "M-R", "S-Z"],
          logic(city: any, filterVal: any) {
            const show =
              (filterVal.indexOf("A-F") >= 0 &&
                city.charCodeAt(0) >= "A".charCodeAt(0) &&
                city.charCodeAt(0) <= "F".charCodeAt(0)) ||
              (filterVal.indexOf("G-L") >= 0 &&
                city.charCodeAt(0) >= "G".charCodeAt(0) &&
                city.charCodeAt(0) <= "L".charCodeAt(0)) ||
              (filterVal.indexOf("M-R") >= 0 &&
                city.charCodeAt(0) >= "M".charCodeAt(0) &&
                city.charCodeAt(0) <= "R".charCodeAt(0)) ||
              (filterVal.indexOf("S-Z") >= 0 &&
                city.charCodeAt(0) >= "S".charCodeAt(0) &&
                city.charCodeAt(0) <= "Z".charCodeAt(0));
            return !show;
          },
        },
      },
    },
    {
      name: "cuisines",
      label: "Cuisines",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: [
            "Afghan",
            "Albanian",
            "American",
            "Amish",
            "Argentine",
            "Armenian",
            "Australian",
            "Austrian",
            "Balearic",
            "Bangladeshi",
            "Belgian",
            "Bolivian",
            "Brazilian",
            "British",
            "Burmese",
            "Cajun",
            "California",
            "Cambodian",
            "Canadian",
            "Cantonese",
            "Caribbean",
            "Chilean",
            "Chinese",
            "Colombian",
            "Creole",
            "Cuban",
            "Danish",
            "Dominican",
            "Ecuadorian",
            "Ethiopian",
            "Filipino",
            "French",
            "Georgian",
            "German",
            "Greek",
            "Guyanese",
            "Haitian",
            "Hawaiian",
            "Hong Kong",
            "Hungarian",
            "Icelandic",
            "Indian",
            "Indonesian",
            "Iranian",
            "Irish",
            "Israeli",
            "Italian",
            "Jamaican",
            "Japanese",
            "Jewish",
            "Korean",
            "Lebanese",
            "Malaysian",
            "Mexican",
            "Moldovan",
            "Mongolian",
            "Moroccan",
            "Nepalese",
            "New American",
            "New Mexican",
            "New Zealand",
            "Nicaraguan",
            "Nigerian",
            "Pakistani",
            "Paraguayan",
            "Peruvian",
            "Polish",
            "Portuguese",
            "Puerto Rican",
            "Punjabi",
            "Russian",
            "Salvadorean",
            "Saudi Arabian",
            "Scandinavian",
            "Scottish",
            "Sichuan",
            "Singaporean",
            "Somali",
            "Soul Food",
            "South African",
            "Southern",
            "Southwestern",
            "Spanish",
            "Sri Lankan",
            "Swedish",
            "Swiss",
            "Syrian",
            "Taiwanese",
            "Tex-Mex",
            "Thai",
            "Tibetan",
            "Trinidad And Tobago",
            "Tunisian",
            "Turkish",
            "Ukrainian",
            "Uruguayan",
            "Uzbek",
            "Venezuelan",
            "Vietnamese",
            "Welsh",
            "Yemeni",
          ],
          logic(cuisines: string, filterVal: any) {
            const show =
              (filterVal.indexOf("Afghan") >= 0 &&
                cuisines.includes("Afghan")) ||
              (filterVal.indexOf("Albanian") >= 0 &&
                cuisines.includes("Albanian")) ||
              (filterVal.indexOf("American") >= 0 &&
                cuisines.includes("American")) ||
              (filterVal.indexOf("Amish") >= 0 && cuisines.includes("Amish")) ||
              (filterVal.indexOf("Argentine") >= 0 &&
                cuisines.includes("Argentine")) ||
              (filterVal.indexOf("Armenian") >= 0 &&
                cuisines.includes("Armenian")) ||
              (filterVal.indexOf("Australian") >= 0 &&
                cuisines.includes("Australian")) ||
              (filterVal.indexOf("Austrian") >= 0 &&
                cuisines.includes("Austrian")) ||
              (filterVal.indexOf("Balearic") >= 0 &&
                cuisines.includes("Balearic")) ||
              (filterVal.indexOf("Bangladeshi") >= 0 &&
                cuisines.includes("Bangladeshi")) ||
              (filterVal.indexOf("Belgian") >= 0 &&
                cuisines.includes("Belgian")) ||
              (filterVal.indexOf("Bolivian") >= 0 &&
                cuisines.includes("Bolivian")) ||
              (filterVal.indexOf("Brazilian") >= 0 &&
                cuisines.includes("Brazilian")) ||
              (filterVal.indexOf("British") >= 0 &&
                cuisines.includes("British")) ||
              (filterVal.indexOf("Burmese") >= 0 &&
                cuisines.includes("Burmese")) ||
              (filterVal.indexOf("Cajun") >= 0 && cuisines.includes("Cajun")) ||
              (filterVal.indexOf("California") >= 0 &&
                cuisines.includes("California")) ||
              (filterVal.indexOf("Cambodian") >= 0 &&
                cuisines.includes("Cambodian")) ||
              (filterVal.indexOf("Canadian") >= 0 &&
                cuisines.includes("Canadian")) ||
              (filterVal.indexOf("Cantonese") >= 0 &&
                cuisines.includes("Cantonese")) ||
              (filterVal.indexOf("Caribbean") >= 0 &&
                cuisines.includes("Caribbean")) ||
              (filterVal.indexOf("Chilean") >= 0 &&
                cuisines.includes("Chilean")) ||
              (filterVal.indexOf("Chinese") >= 0 &&
                cuisines.includes("Chinese")) ||
              (filterVal.indexOf("Colombian") >= 0 &&
                cuisines.includes("Colombian")) ||
              (filterVal.indexOf("Creole") >= 0 &&
                cuisines.includes("Creole")) ||
              (filterVal.indexOf("Cuban") >= 0 && cuisines.includes("Cuban")) ||
              (filterVal.indexOf("Danish") >= 0 &&
                cuisines.includes("Danish")) ||
              (filterVal.indexOf("Dominican") >= 0 &&
                cuisines.includes("Dominican")) ||
              (filterVal.indexOf("Ecuadorian") >= 0 &&
                cuisines.includes("Ecuadorian")) ||
              (filterVal.indexOf("Ethiopian") >= 0 &&
                cuisines.includes("Ethiopian")) ||
              (filterVal.indexOf("Filipino") >= 0 &&
                cuisines.includes("Filipino")) ||
              (filterVal.indexOf("French") >= 0 &&
                cuisines.includes("French")) ||
              (filterVal.indexOf("Georgian") >= 0 &&
                cuisines.includes("Georgian")) ||
              (filterVal.indexOf("German") >= 0 &&
                cuisines.includes("German")) ||
              (filterVal.indexOf("Greek") >= 0 && cuisines.includes("Greek")) ||
              (filterVal.indexOf("Guyanese") >= 0 &&
                cuisines.includes("Guyanese")) ||
              (filterVal.indexOf("Haitian") >= 0 &&
                cuisines.includes("Haitian")) ||
              (filterVal.indexOf("Hawaiian") >= 0 &&
                cuisines.includes("Hawaiian")) ||
              (filterVal.indexOf("Hong Kong") >= 0 &&
                cuisines.includes("Hong Kong")) ||
              (filterVal.indexOf("Hungarian") >= 0 &&
                cuisines.includes("Hungarian")) ||
              (filterVal.indexOf("Icelandic") >= 0 &&
                cuisines.includes("Icelandic")) ||
              (filterVal.indexOf("Indian") >= 0 &&
                cuisines.includes("Indian")) ||
              (filterVal.indexOf("Indonesian") >= 0 &&
                cuisines.includes("Indonesian")) ||
              (filterVal.indexOf("Iranian") >= 0 &&
                cuisines.includes("Iranian")) ||
              (filterVal.indexOf("Irish") >= 0 && cuisines.includes("Irish")) ||
              (filterVal.indexOf("Israeli") >= 0 &&
                cuisines.includes("Israeli")) ||
              (filterVal.indexOf("Italian") >= 0 &&
                cuisines.includes("Italian")) ||
              (filterVal.indexOf("Jamaican") >= 0 &&
                cuisines.includes("Jamaican")) ||
              (filterVal.indexOf("Japanese") >= 0 &&
                cuisines.includes("Japanese")) ||
              (filterVal.indexOf("Jewish") >= 0 &&
                cuisines.includes("Jewish")) ||
              (filterVal.indexOf("Korean") >= 0 &&
                cuisines.includes("Korean")) ||
              (filterVal.indexOf("Lebanese") >= 0 &&
                cuisines.includes("Lebanese")) ||
              (filterVal.indexOf("Malaysian") >= 0 &&
                cuisines.includes("Malaysian")) ||
              (filterVal.indexOf("Mexican") >= 0 &&
                cuisines.includes("Mexican")) ||
              (filterVal.indexOf("Moldovan") >= 0 &&
                cuisines.includes("Moldovan")) ||
              (filterVal.indexOf("Mongolian") >= 0 &&
                cuisines.includes("Mongolian")) ||
              (filterVal.indexOf("Moroccan") >= 0 &&
                cuisines.includes("Moroccan")) ||
              (filterVal.indexOf("Nepalese") >= 0 &&
                cuisines.includes("Nepalese")) ||
              (filterVal.indexOf("New American") >= 0 &&
                cuisines.includes("New American")) ||
              (filterVal.indexOf("New Mexican") >= 0 &&
                cuisines.includes("New Mexican")) ||
              (filterVal.indexOf("New Zealand") >= 0 &&
                cuisines.includes("New Zealand")) ||
              (filterVal.indexOf("Nicaraguan") >= 0 &&
                cuisines.includes("Nicaraguan")) ||
              (filterVal.indexOf("Nigerian") >= 0 &&
                cuisines.includes("Nigerian")) ||
              (filterVal.indexOf("Pakistani") >= 0 &&
                cuisines.includes("Pakistani")) ||
              (filterVal.indexOf("Paraguayan") >= 0 &&
                cuisines.includes("Paraguayan")) ||
              (filterVal.indexOf("Peruvian") >= 0 &&
                cuisines.includes("Peruvian")) ||
              (filterVal.indexOf("Polish") >= 0 &&
                cuisines.includes("Polish")) ||
              (filterVal.indexOf("Portuguese") >= 0 &&
                cuisines.includes("Portuguese")) ||
              (filterVal.indexOf("Puerto Rican") >= 0 &&
                cuisines.includes("Puerto Rican")) ||
              (filterVal.indexOf("Punjabi") >= 0 &&
                cuisines.includes("Punjabi")) ||
              (filterVal.indexOf("Russian") >= 0 &&
                cuisines.includes("Russian")) ||
              (filterVal.indexOf("Salvadorean") >= 0 &&
                cuisines.includes("Salvadorean")) ||
              (filterVal.indexOf("Saudi Arabian") >= 0 &&
                cuisines.includes("Saudi Arabian")) ||
              (filterVal.indexOf("Scandinavian") >= 0 &&
                cuisines.includes("Scandinavian")) ||
              (filterVal.indexOf("Scottish") >= 0 &&
                cuisines.includes("Scottish")) ||
              (filterVal.indexOf("Sichuan") >= 0 &&
                cuisines.includes("Sichuan")) ||
              (filterVal.indexOf("Singaporean") >= 0 &&
                cuisines.includes("Singaporean")) ||
              (filterVal.indexOf("Somali") >= 0 &&
                cuisines.includes("Somali")) ||
              (filterVal.indexOf("Soul Food") >= 0 &&
                cuisines.includes("Soul Food")) ||
              (filterVal.indexOf("South African") >= 0 &&
                cuisines.includes("South African")) ||
              (filterVal.indexOf("Southern") >= 0 &&
                cuisines.includes("Southern")) ||
              (filterVal.indexOf("Southwestern") >= 0 &&
                cuisines.includes("Southwestern")) ||
              (filterVal.indexOf("Spanish") >= 0 &&
                cuisines.includes("Spanish")) ||
              (filterVal.indexOf("Sri Lankan") >= 0 &&
                cuisines.includes("Sri Lankan")) ||
              (filterVal.indexOf("Swedish") >= 0 &&
                cuisines.includes("Swedish")) ||
              (filterVal.indexOf("Swiss") >= 0 && cuisines.includes("Swiss")) ||
              (filterVal.indexOf("Syrian") >= 0 &&
                cuisines.includes("Syrian")) ||
              (filterVal.indexOf("Taiwanese") >= 0 &&
                cuisines.includes("Taiwanese")) ||
              (filterVal.indexOf("Tex-Mex") >= 0 &&
                cuisines.includes("Tex-Mex")) ||
              (filterVal.indexOf("Thai") >= 0 && cuisines.includes("Thai")) ||
              (filterVal.indexOf("Tibetan") >= 0 &&
                cuisines.includes("Tibetan")) ||
              (filterVal.indexOf("Trinidad And Tobago") >= 0 &&
                cuisines.includes("Trinidad And Tobago")) ||
              (filterVal.indexOf("Tunisian") >= 0 &&
                cuisines.includes("Tunisian")) ||
              (filterVal.indexOf("Turkish") >= 0 &&
                cuisines.includes("Turkish")) ||
              (filterVal.indexOf("Ukrainian") >= 0 &&
                cuisines.includes("Ukrainian")) ||
              (filterVal.indexOf("Uruguayan") >= 0 &&
                cuisines.includes("Uruguayan")) ||
              (filterVal.indexOf("Uzbek") >= 0 && cuisines.includes("Uzbek")) ||
              (filterVal.indexOf("Venezuelan") >= 0 &&
                cuisines.includes("Venezuelan")) ||
              (filterVal.indexOf("Vietnamese") >= 0 &&
                cuisines.includes("Vietnamese")) ||
              (filterVal.indexOf("Welsh") >= 0 && cuisines.includes("Welsh")) ||
              (filterVal.indexOf("Yemeni") >= 0 && cuisines.includes("Yemeni"));
            return !show;
          },
        },
      },
    },
    {
      name: "price_range",
      label: "Price Range",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ["$", "$$", "$$$", "$$$$"],
          logic(price_range: any, filterVal: any) {
            const show =
              (filterVal.indexOf("$") >= 0 && price_range == 1) ||
              (filterVal.indexOf("$$") >= 0 && price_range == 2) ||
              (filterVal.indexOf("$$$") >= 0 && price_range == 3) ||
              (filterVal.indexOf("$$$$") >= 0 && price_range == 4);
            return !show;
          },
        },
      },
    },
    {
      name: "aggregate_rating",
      label: "Rating",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ["0", "1", "2", "3", "4", "5"],
          logic(aggregate_rating: any, filterVal: any) {
            const show =
              (filterVal.indexOf("0") >= 0 && aggregate_rating < 1) ||
              (filterVal.indexOf("1") >= 0 &&
                aggregate_rating >= 1 &&
                aggregate_rating < 2) ||
              (filterVal.indexOf("2") >= 0 &&
                aggregate_rating >= 2 &&
                aggregate_rating < 3) ||
              (filterVal.indexOf("3") >= 0 &&
                aggregate_rating >= 3 &&
                aggregate_rating < 4) ||
              (filterVal.indexOf("4") >= 0 &&
                aggregate_rating >= 4 &&
                aggregate_rating < 5) ||
              (filterVal.indexOf("5") >= 0 && aggregate_rating == 4);
            return !show;
          },
        },
      },
    },
    {
      name: "average_cost_for_two",
      label: "Average Cost for Two",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: [
            "$0-$20",
            "$22-$50",
            "$55-$100",
            "$105-$200",
            "$210-$300",
            "$330-$500",
            "$600+",
          ],
          logic(average_cost_for_two: any, filterVal: any) {
            const show =
              (filterVal.indexOf("$0-$20") >= 0 &&
                average_cost_for_two >= 0 &&
                average_cost_for_two <= 20) ||
              (filterVal.indexOf("$22-$50") >= 0 &&
                average_cost_for_two >= 22 &&
                average_cost_for_two <= 50) ||
              (filterVal.indexOf("$55-$100") >= 0 &&
                average_cost_for_two >= 55 &&
                average_cost_for_two <= 100) ||
              (filterVal.indexOf("$105-$200") >= 0 &&
                average_cost_for_two >= 105 &&
                average_cost_for_two <= 200) ||
              (filterVal.indexOf("$210-$300") >= 0 &&
                average_cost_for_two >= 210 &&
                average_cost_for_two <= 300) ||
              (filterVal.indexOf("$330-$500") >= 0 &&
                average_cost_for_two >= 330 &&
                average_cost_for_two <= 500) ||
              (filterVal.indexOf("$600+") >= 0 && average_cost_for_two >= 600);
            return !show;
          },
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox" as any,
    download: false,
    print: false,
    selectableRowsHideCheckboxes: true,
    onRowClick: (
      rowData: string[],
      rowMeta: { dataIndex: number; rowIndex: number }
    ) => {
      routeChange(rowData[0]);
    },
  };

  const headerImgStyle: CSS.Properties = {
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
    width: '100%',
    height: '450px',
    marginBottom: "0px",
    marginTop: "0px",
    display: "block",
    opacity: "0.7",   
  };

  const headerTextStyle: CSS.Properties = {
    textShadow: '1px 1px 3px black',
    fontSize: '11rem',
    color: 'white',
    width: '100%', 
  };

  const headerCardStyle: CSS.Properties = {
    width:"100%", 
    height:"auto",
  };

  const rowStyle: CSS.Properties = {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  };

  const subtitleTextStyle: CSS.Properties = {
    textShadow: '1px 1px 3px black',
    color: 'white',
    width: '100%', 
  };

  if (loaded) {
    return (
      <body>
        {/* <Row
          className="justify-content-md-center"
          style={{
            margin: 25,
          }}
        >
          <Col md={3}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={small} alt="loading..." />
            </div>
          </Col>

          <Col md={3}>
            <h1
              className="text-align center"
              style={{
                margin: 25,
              }}
            >
              Restaurants
            </h1>
          </Col>

          <Col md={3}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={small} alt="loading..." />
            </div>
          </Col>
        </Row> */}

          <Row >
          <Card style={headerCardStyle}>
              <Card.Img src={restImg} style={headerImgStyle}/>
              <Card.ImgOverlay>
              <Row className="mt-4" style={rowStyle}>
                  <Card.Title>
                    <h1 style={headerTextStyle}>Restaurants</h1>
                  </Card.Title>
              </Row>
              <Row style={rowStyle} className="mt-5">
                  <Card.Subtitle style={subtitleTextStyle}>
                    <h4>😋 Hungry? Whether you're looking for French escargot or Korean bulgogi, we've got just the restaurant for you! 🍽️ </h4>
                  </Card.Subtitle>
              </Row>
              </Card.ImgOverlay>
            </Card>
          </Row>

        <MUIDataTable
          title={"Restaurants"}
          data={restaurants}
          columns={columns}
          options={options}
        />
      </body>
    );
  } else {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img src={logo} alt="loading..." />
      </div>
    );
  }
}

export default Restaurants;
