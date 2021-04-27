import "../styles/About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { MDBIcon } from "mdbreact";
import { Highlight } from "react-instantsearch-dom";
import Highlighter from "react-highlight-words";

const InfoCard = (props: any) => {
  const { title, description, img, link } = props;
  return (
    <div className="col-md-4">
      <a href={link} className="card text-center" target="_blank">
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
    <a href={linkedin} className="card text-center" target="_blank">
      <img src={img} className="card-img-top profile-img img-fluid" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text"> {role}</p>
        <p className="card-text"> {bio}</p>
      </div>
        <div className = "card-text d-flex flex-column mb-2">
        <div className="row border-top pt-2">
          <div className="col border-right">
            <p className="card-text">
              Commits
              <br />
              <MDBIcon icon="code-branch" size="1x" />
              <br />
              {commits}
            </p>
          </div>
          <div className="col border-right">
            <p className="card-text">
              Issues
              <br />
              <MDBIcon icon="list-ul" size="1x" />
              <br />
              {issues}
            </p>
          </div>
          <div className="col">
            <p className="card-text">
              Tests
              <br />
              <MDBIcon far icon="check-circle" size="1x" />
              <br />
              {tests}
            </p>
          </div>
        </div>
        </div>
    </a>
  );
};

const CitiesCard = (props: any) => {
  const { city } = props;
  let leisureCulture =
    parseInt(city["leisure_culture"]!) == 0
      ? "No Data"
      : parseFloat(city["leisure_culture"].toFixed(2));
  let costOfLiving =
    parseInt(city["cost_of_living"]!) == 0
      ? "No Data"
      : parseFloat(city["cost_of_living"].toFixed(2));
  let environmentalQuality =
    parseInt(city["environmental_quality"]!) == 0
      ? "No Data"
      : parseFloat(city["environmental_quality"].toFixed(2));
  let travelConnectivity =
    parseInt(city["travel_connectivity"]!) == 0
      ? "No Data"
      : parseFloat(city["travel_connectivity"].toFixed(2));

  let searchWords = props.searchQuery.split(" ");

  return (
    <a href={"/cities/" + city["id"]} className="card">
      <h5 className="card-title mt-3">
        <Highlighter
          highlightClassName="highlight-class"
          searchWords={searchWords}
          textToHighlight={city["name"]}
        ></Highlighter>
      </h5>
      <img src={city["imagesmobile"]} className="city-card-img-top" />
      <div className="card-body text-left">
        <p>
          <b>State: </b>
          <Highlighter
            highlightClassName="highlight-class"
            searchWords={searchWords}
            textToHighlight={city["state"]}
          ></Highlighter>
          <br />
          <b>Leisure and Culture: </b>
          <Highlighter
            highlightClassName="highlight-class"
            searchWords={searchWords}
            textToHighlight={String(leisureCulture)}
          ></Highlighter>
          <br />
          <b>Cost of Living: </b>
          <Highlighter
            highlightClassName="highlight-class"
            searchWords={searchWords}
            textToHighlight={String(costOfLiving)}
          ></Highlighter>
          <br />
          <b>Environmental Quality: </b>
          <Highlighter
            highlightClassName="highlight-class"
            searchWords={searchWords}
            textToHighlight={String(environmentalQuality)}
          ></Highlighter>
          <br />
          <b>Travel Connectivity: </b>
          <Highlighter
            highlightClassName="highlight-class"
            searchWords={searchWords}
            textToHighlight={String(travelConnectivity)}
          ></Highlighter>
          <br />
          <b>Population: </b>
          <Highlighter
            highlightClassName="highlight-class"
            searchWords={searchWords}
            textToHighlight={city["population"].toLocaleString()}
          ></Highlighter>
          <br />
        </p>
      </div>
    </a>
  );
};
const CuisinesCard = (props: any) => {
  const { cuisine, countries, loaded } = props;
  let searchWords = props.searchQuery.split(" ");
  return (
    <a href={"/cuisines/" + cuisine["id"]} id="module" className="card">
      <h5 className="card-title mt-3">
        <Highlighter
          highlightClassName="highlight-class"
          searchWords={searchWords}
          textToHighlight={cuisine["name"]}
        ></Highlighter>
      </h5>
      <img src={cuisine.dishes[0].image_url} className="city-card-img-top" />
      <div className="card-body align-self-start">
        <p>
          {cuisine?.countryID.split(", ").map((cID: string, i: number) => (
            <>
              {loaded ? (
                <>
                  {cuisine["id"] == 21 || cuisine["id"] == 74 ? (
                    <>
                      <p
                        className="collapse"
                        id="collapseParagraph"
                        aria-expanded="false"
                      >
                        <b>Country: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={cuisine["country"].split(", ")[i]}
                        ></Highlighter>
                        <br />
                        <b>Capital: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[parseInt(cID)].capital}
                        ></Highlighter>
                        <br />
                        <b>Region: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[parseInt(cID)].region}
                        ></Highlighter>
                        <br />
                        <b>Subregion: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[parseInt(cID)].subregion}
                        ></Highlighter>
                        <br />
                        <b>Population: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[
                            parseInt(cID)
                          ].population.toLocaleString()}
                        ></Highlighter>
                        <br />
                        <b>Area: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[
                            parseInt(cID)
                          ].area.toLocaleString()}
                        ></Highlighter>
                        &nbsp;km<sup>2</sup>
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <b>Country: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={cuisine["country"].split(", ")[i]}
                        ></Highlighter>
                        <br />
                        <b>Capital: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[parseInt(cID)].capital}
                        ></Highlighter>
                        <br />
                        <b>Region: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[parseInt(cID)].region}
                        ></Highlighter>
                        <br />
                        <b>Subregion: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[parseInt(cID)].subregion}
                        ></Highlighter>
                        <br />
                        <b>Population: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[
                            parseInt(cID)
                          ].population.toLocaleString()}
                        ></Highlighter>
                        <br />
                        <b>Area: </b>
                        <Highlighter
                          highlightClassName="highlight-class"
                          searchWords={searchWords}
                          textToHighlight={countries[
                            parseInt(cID)
                          ].area.toLocaleString()}
                        ></Highlighter>
                        &nbsp;km<sup>2</sup>
                      </p>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </p>
        {cuisine["id"] == 21 || cuisine["id"] == 74 ? (
          <a
            role="button"
            className="collapsed"
            data-toggle="collapse"
            href="#collapseParagraph"
            aria-expanded="false"
            aria-controls="collapseParagraph"
          ></a>
        ) : (
          <></>
        )}
      </div>
    </a>
  );
};

const SearchCard = (props: any) => {
  const { result } = props;
  return (
    <div>
      <div className="name">
        <Highlight tagName="mark" attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight tagName="mark" attribute="summary" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight tagName="mark" attribute="state" hit={props.hit} />
      </div>
    </div>
  );
};

export { InfoCard, ProfileCard, CitiesCard, CuisinesCard, SearchCard };
