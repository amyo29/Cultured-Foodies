import React from "react";
import "../styles/Footer.css";
import Card from "react-bootstrap/Card";
import "../styles/About.css";
import Accordion from "react-bootstrap/Accordion";

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
      <h5 className="card-title mt-3">{city["name"]}</h5>
      <img src={city["imagesmobile"]} className="city-card-img-top" />
      <div className="card-body text-left">
        <p>
          <b>State: </b> {city["state"]} <br />
          <b>Leisure and Culture: </b>{" "}
          {parseFloat(city["leisure_culture"].toFixed(4))} <br />
          <b>Cost of Living: </b>{" "}
          {parseFloat(city["cost_of_living"].toFixed(4))} <br />
          <b>Environmental Quality: </b>{" "}
          {parseFloat(city["environmental_quality"].toFixed(4))} <br />
          <b>Travel Connectivity: </b>{" "}
          {parseFloat(city["travel_connectivity"].toFixed(4))} <br />
          <b>Population: </b> {city["population"].toLocaleString()} <br />
        </p>
      </div>
    </a>
  );
};
const CuisinesCard = (props: any) => {
  const { cuisine, countries, loaded } = props;
  return (
    <div>
      {loaded ? (
        <p>
          {cuisine["id"] == 21 || cuisine["id"] == 74 ? (
            <Accordion defaultActiveKey="0">
              <Card>
                <a href={"/cuisines/" + cuisine["id"]} className="card">
                  <h5 className="card-title mt-3">{cuisine["name"]}</h5>
                  <img
                    src={cuisine.dishes[0].image_url}
                    className="city-card-img-top"
                  />
                </a>
                <div className="card-body text-left">
                  <p>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Show more
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card>
                        {cuisine?.countryID.split(", ").map((cID: string, i:number) => (
                          <>
                            <p>
                              <b>Country: </b>
                              {cuisine["country"].split(", ")[i]} <br />
                              <b>Capital: </b>
                              {countries[parseInt(cID)].capital} <br />
                              <b>Region: </b>
                              {countries[parseInt(cID)].region} <br />
                              <b>Population: </b>
                              {countries[
                                parseInt(cID)
                              ].population.toLocaleString()}
                              <br />
                              <b>Area: </b>
                              {countries[
                                parseInt(cID)
                              ].area.toLocaleString()}{" "}
                              km<sup>2</sup>
                            </p>
                          </>
                        ))}
                      </Card>
                    </Accordion.Collapse>
                  </p>
                </div>
              </Card>
            </Accordion>
          ) : (
            <a href={"/cuisines/" + cuisine["id"]} className="card">
              <h5 className="card-title mt-3">{cuisine["name"]}</h5>
              <img
                src={cuisine.dishes[0].image_url}
                className="city-card-img-top"
              />
              <div className="card-body text-left">
                <p>
                  {cuisine?.countryID.split(", ").map((cID: string, i:number) => (
                    // <p>{ cID} </p>
                    // <p>{countries[cID]?.name} </p>
                    <>
                      {loaded ? (
                        <p>
                          <b>Country: </b>
                          {cuisine["country"].split(", ")[i]} <br />
                          <b>Capital: </b>
                          {countries[parseInt(cID)].capital} <br />
                          <b>Region: </b>
                          {countries[parseInt(cID)].region} <br />
                          <b>Population: </b>
                          {countries[parseInt(cID)].population.toLocaleString()}
                          <br />
                          <b>Area: </b>
                          {countries[parseInt(cID)].area.toLocaleString()} km
                          <sup>2</sup>
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </p>
              </div>
            </a>
          )}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export { InfoCard, ProfileCard, CitiesCard, CuisinesCard };
