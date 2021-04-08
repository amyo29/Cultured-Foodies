import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import "../../styles/Restaurants.css";
import useAxios from "axios-hooks";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import logo from "../../static_resources/dumpling.gif";
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

  const routeChange = (id: number) => {
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
        display: "excluded",
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
      },
    },
    {
      name: "cuisines",
      label: "Cuisines",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price_range",
      label: "Price Range",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "aggregate_rating",
      label: "Rating",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "average_cost_for_two",
      label: "Average Cost for Two",
      options: {
        filter: true,
        sort: true,
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
      routeChange(rowMeta.rowIndex + 1);
    },
  };

  if (loaded) {
    return (
      <div>
        <Row
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
        </Row>

        <MUIDataTable
          title={"Restaurants"}
          data={restaurants}
          columns={columns}
          options={options}
        />
      </div>
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
