import algoliasearch from "algoliasearch/lite";
import NavBarSolid from "../../components/NavBarSolid";
import "../../styles/Search.css";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  Index,
  connectHits,
  connectStateResults,
} from "react-instantsearch-dom";

const CuisineHit = ({ hits }) => (
  <div className="row mb-4 ml-4 mr-4">
    {hits.map((hit, index) => (
      <div className="col-md-4 mb-4">
        <a
          href={"/cuisines/" + hit["id"]}
          className="card"
          target="_blank"
          rel="noopener noreferrer"
          id="module"
          style={{ width: "40rem", fontSize: "16px" }}
        >
          <div
            className="card-body align-self-start"
            style={{ wordBreak: "break-all" }}
          >
            <p
              className="collapse"
              id={`id_${Math.floor(index / 3)}`}
              aria-expanded="false"
            >
              <div className="name">
                <b>Name: </b>
                <Highlight tagName="mark" attribute="name" hit={hit} />
              </div>
              <div className="hit-description">
                <b>Country: </b>
                <Highlight tagName="mark" attribute="country" hit={hit} />
              </div>
              <div className="hit-description">
                <b>Cities: </b>
                <Highlight tagName="mark" attribute="cities" hit={hit} />
              </div>
              <div className="hit-description">
                <b>Restaurants: </b>
                <Highlight tagName="mark" attribute="restaurants" hit={hit} />
              </div>
              <div className="hit-description">
                <b>Description: </b>
                <Highlight tagName="mark" attribute="description" hit={hit} />
              </div>
              <div className="hit-description">
                <b>Dishes: </b>
                {hit.dishes.map((dish, counter) => (
                  <li className="ml-5" key={counter}>
                    <Highlight
                      tagName="mark"
                      attribute={`dishes[${counter}].name`}
                      hit={hit}
                    />
                  </li>
                ))}
              </div>
              <div className="hit-description">
                <b>Country Info: </b>
                {hit.country_data.map((country, counter) => (
                  <>
                    <li className="ml-5" key={counter}>
                      <div>
                        Capital:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].capital`}
                          hit={hit}
                        />{" "}
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Alpha 3 Code:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].alpha3code`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Region:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].region`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Subregion:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].subregion`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Latitude:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].latitude`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Longitude:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].longitude`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Area:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].area`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Population:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].population`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Borders:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].borders`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <li className="ml-5" key={counter}>
                      <div>
                        Timezones:{" "}
                        <Highlight
                          tagName="mark"
                          attribute={`country_data[${counter}].timezones`}
                          hit={hit}
                        />
                      </div>
                    </li>
                    <b>Translations: </b>
                    {country ? (
                      Object.keys(country?.translations).map((key, index) => (
                        <li className="ml-5" key={counter}>
                          <Highlight
                            tagName="mark"
                            attribute={`country_data[${counter}].translations.${key}`}
                            hit={hit}
                          />
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            </p>
          </div>
          <a
            role="button"
            className="collapsed"
            data-toggle="collapse"
            href={`#id_${Math.floor(index / 3)}`}
            aria-expanded="false"
            aria-controls={`id_${Math.floor(index / 3)}`}
          >
            {" "}
          </a>
        </a>
      </div>
    ))}
  </div>
);
const CustomCuisineHits = connectHits(CuisineHit);

/* displays element for resulting cuisine when user types in query */
const CuisineContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomCuisineHits />
    </div>
  ) : null
);

const CityHit = ({ hits }) => (
  <div className="row mb-4 ml-4 mr-4">
    {hits.map((hit, index) => (
      <div className="col-md-4 mb-4">
        <a
          href={"/cities/" + hit["id"]}
          className="card"
          target="_blank"
          rel="noopener noreferrer"
          id="module"
          style={{ width: "40rem" }}
        >
          <div
            className="card-body align-self-start"
            style={{ fontSize: "16px", wordBreak: "break-all" }}
          >
            <p
              className="collapse"
              id={`id_${Math.floor(index / 3)}c`}
              aria-expanded="false"
            >
              <div className="name">
                <b>Full Name: </b>
                <Highlight tagName="mark" attribute="full_name" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Description: </b>
                <Highlight tagName="mark" attribute="summary" hit={hit} />
              </div>

              <div className="hit-description">
                <b>State: </b>
                <Highlight tagName="mark" attribute="state" hit={hit} />
              </div>
              <div className="hit-description">
                <b>Population: </b>
                <Highlight tagName="mark" attribute="population" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Latitude: </b>
                <Highlight tagName="mark" attribute="latitude" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Longitude: </b>
                <Highlight tagName="mark" attribute="longitude" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Timezone: </b>
                <Highlight tagName="mark" attribute="timezone" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Business Freedom: </b>
                <Highlight
                  tagName="mark"
                  attribute="business_freedom"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Cost of Living: </b>
                <Highlight
                  tagName="mark"
                  attribute="cost_of_living"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Economy: </b>
                <Highlight tagName="mark" attribute="economy" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Housing: </b>
                <Highlight tagName="mark" attribute="housing" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Commute: </b>
                <Highlight tagName="mark" attribute="commute" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Education: </b>
                <Highlight tagName="mark" attribute="education" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Environmental Quality: </b>
                <Highlight
                  tagName="mark"
                  attribute="environmental_quality"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Healthcare: </b>
                <Highlight tagName="mark" attribute="healthcare" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Leisure and Culture: </b>
                <Highlight
                  tagName="mark"
                  attribute="leisure_culture"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Outdoors: </b>
                <Highlight tagName="mark" attribute="outdoors" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Safety: </b>
                <Highlight tagName="mark" attribute="safety" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Startups: </b>
                <Highlight tagName="mark" attribute="startups" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Taxation: </b>
                <Highlight tagName="mark" attribute="taxation" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Tolerance: </b>
                <Highlight tagName="mark" attribute="tolerance" hit={hit} />
              </div>

              <div className="hit-description">
                <b>Travel and Connectivity: </b>
                <Highlight
                  tagName="mark"
                  attribute="travel_connectivity"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Internet Access: </b>
                <Highlight
                  tagName="mark"
                  attribute="internet_access"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Venture Capital: </b>
                <Highlight
                  tagName="mark"
                  attribute="venture_capital"
                  hit={hit}
                />
              </div>

              <div className="hit-description">
                <b>Restaurants: </b>
                <Highlight tagName="mark" attribute="restaurants" hit={hit} />
              </div>
            </p>
          </div>
          <a
            role="button"
            className="collapsed"
            data-toggle="collapse"
            href={`#id_${Math.floor(index / 3)}c`}
            aria-expanded="false"
            aria-controls={`id_${Math.floor(index / 3)}c`}
          >
            {" "}
          </a>
        </a>
      </div>
    ))}
  </div>
);
const CustomCityHits = connectHits(CityHit);

/* displays element for resulting cuisine when user types in query */
const CityContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomCityHits />
    </div>
  ) : null
);

const RestaurantHit = ({ hits }) => (
  <div className="row mb-4 ml-4 mr-4">
    {hits.map((hit) => (
      <div className="col-md-4 mb-4">
        <a
          href={"/restaurants/" + hit["id"]}
          className="card"
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: "40rem" }}
        >
          <div
            className="card-body align-self-start"
            style={{ wordBreak: "break-all" }}
          >
            <div className="name">
              <b>Restaurant Name: </b>
              <Highlight tagName="mark" attribute="name" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Phone Numbers: </b>
              <Highlight tagName="mark" attribute="phone_numbers" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Address: </b>
              <Highlight tagName="mark" attribute="address" hit={hit} />
            </div>

            <div className="hit-description">
              <b>City: </b>
              <Highlight tagName="mark" attribute="city" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Zipcode: </b>
              <Highlight tagName="mark" attribute="zipcode" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Highlights: </b>
              <Highlight tagName="mark" attribute="highlights" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Price Range: </b>
              <Highlight tagName="mark" attribute="price_range" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Average cost for two: </b>
              <Highlight
                tagName="mark"
                attribute="average_cost_for_two"
                hit={hit}
              />
            </div>

            <div className="hit-description">
              <b>Menu URL: </b>
              <Highlight tagName="mark" attribute="menu_url" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Timings: </b>
              <Highlight tagName="mark" attribute="timings" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Citie(s): </b>
              <Highlight tagName="mark" attribute="city" hit={hit} />
            </div>

            <div className="hit-description">
              <b>Cuisine(s): </b>
              <Highlight tagName="mark" attribute="cuisines" hit={hit} />
            </div>
          </div>
        </a>
      </div>
    ))}
  </div>
);
const CustomRestaurantHits = connectHits(RestaurantHit);

/* displays element for resulting cuisine when user types in query */
const RestaurantContent = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div className="content">
      <CustomRestaurantHits />
    </div>
  ) : null
);
function Search(query) {
  const searchClient = algoliasearch(
    "2EZLZI9A68",
    "d04bf0d390cc40ca14eebcd6d0acea55"
  );

  return (
    <div class="pageStyle">
      <NavBarSolid />
      <h1>Search Results for {`"${query["q"]}"`}</h1>

      <InstantSearch
        indexName="cities"
        searchClient={searchClient}
        searchState={{ query: query["q"] }}
      >
        <div style={{ display: "none" }}>
          <SearchBox />
        </div>
        <Index indexName="cuisines">
          <h2 className="text-center">Cuisines</h2>
          <CuisineContent />
        </Index>
        <Index indexName="cities">
          <h2 className="text-center">Cities</h2>
          <CityContent />
        </Index>
        <Index indexName="restaurants">
          <h2 className="text-center">Restaurants</h2>
          <RestaurantContent />
        </Index>
      </InstantSearch>
    </div>
  );
}

export default Search;
