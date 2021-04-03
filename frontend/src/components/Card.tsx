import React from "react";
import "../styles/Footer.css";
import Card from "react-bootstrap/Card";
import "../styles/About.css";

const InfoCard = (props: any) => {
  const { title, description, img, link } = props;
  return (
    <div className="col-md-4">
      <a href={link} className="card text-center">
        <img src={img} className="card-img-top info-card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text-center"> {description}</p>
        </div>
      </a>
    </div>
  );
};

const ProfileCard = (props: any) => {
  const { name, img, role, bio, commits, issues, tests, linkedin } = props;
  return (
    <a href={linkedin} className="card text-center">
      <img src={img} className="card-img-top profile-img img-fluid" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text"> {role}</p>
        <p className="card-text"> {bio}</p>
        <p className="card-text">Commits: {commits}</p>
        <p className="card-text">Issues: {issues}</p>
        <p className="card-text">Tests: {tests}</p>
      </div>
    </a>
  );
};

const CitiesCard = (props: any) => {
  const { city } = props;
  return (
    <a href={"/cities/" + city["id"]} className="card">
      <h5 className = "card-title mt-3" >{city["name"]}</h5>
      <img
        src={city["imagesmobile"]}
        className="city-card-img-top"
      />
      <div className="card-body text-left">
        <p>
          <b>State: </b> {city["state"]} <br />
          <b>Leisure and Culture: </b> {parseFloat(city["leisure_culture"].toFixed(4))} <br />
          <b>Cost of Living: </b> {parseFloat(city["cost_of_living"].toFixed(4))} <br />
          <b>Environmental Quality: </b> {parseFloat(city["environmental_quality"].toFixed(4))} <br />
          <b>Travel Connectivity: </b> {parseFloat(city["travel_connectivity"].toFixed(4))} <br />
          <b>Population: </b> {city["population"].toLocaleString().toFixed(4)} <br />
        </p>
      </div>
    </a>
  );
};

export { InfoCard, ProfileCard, CitiesCard };
