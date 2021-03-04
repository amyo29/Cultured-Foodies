import React from "react";
import { useParams } from 'react-router-dom';
const countries_data = require("../../data/threeCountries.json")

function Country() {
  const { id } = useParams<{ id: string }>();
  let data = countries_data[+id]
  return (
    <div>
      <header>Country {data["name"]}</header>
    </div>
  );
}

export default Country;
