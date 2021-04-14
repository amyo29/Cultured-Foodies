import React from "react";
import { SearchCard } from "../../components/Card";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Index,
} from "react-instantsearch-dom";
function CuisineHit(props: any) {
  return (
    <div className="card">
      <div className="name">
        <Highlight tagName="mark" attribute="name" hit={props.hit}/>
      </div>
    </div>
  );
}
function CityHit(props: any) {
  // console.log("before");
  // console.log(props.hit["summary"]);
  // var propsCopy = {"summary": props.hit["summary"].replace(/(<([^>]+)>)/gi, "")};
  // props.hit["summary"] = props.hit["summary"].replace(/(<([^>]+)>)/gi, "");
  // console.log(props.hit);
  // console.log("after");
  // console.log(props.hit["summary"]);
  return (
    <div className="card">
      <div className="name">
        <b>Full Name: </b> 
        <Highlight tagName="mark" attribute="full_name" hit={props.hit}/>
      </div>


      <div className="hit-description">
      <b>Description: </b> 
        <Highlight tagName="mark" attribute="summary" hit={propsCopy} />
      </div>
     
      <div className="hit-description">
      <b>State: </b> 
        <Highlight tagName="mark" attribute="state" hit={props.hit} />
      </div>
      <div className="hit-description">
      <b>Population: </b> 
        <Highlight tagName="mark" attribute="population" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Latitude: </b> 
        <Highlight tagName="mark" attribute="latitude" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Longitude: </b> 
        <Highlight tagName="mark" attribute="longitude" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Timezone: </b> 
        <Highlight tagName="mark" attribute="timezone" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Business Freedom: </b> 
        <Highlight tagName="mark" attribute="business_freedom" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Cost of Living: </b> 
        <Highlight tagName="mark" attribute="cost_of_living" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Economy: </b> 
        <Highlight tagName="mark" attribute="economy" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Housing: </b> 
        <Highlight tagName="mark" attribute="housing" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Commute: </b> 
        <Highlight tagName="mark" attribute="commute" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Education: </b> 
        <Highlight tagName="mark" attribute="education" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Environmental Quality: </b> 
        <Highlight tagName="mark" attribute="environmental_quality" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Healthcare: </b> 
        <Highlight tagName="mark" attribute="healthcare" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Leisure and Culture: </b> 
        <Highlight tagName="mark" attribute="leisure_culture" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Outdoors: </b> 
        <Highlight tagName="mark" attribute="outdoors" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Safety: </b> 
        <Highlight tagName="mark" attribute="safety" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Taxation: </b> 
        <Highlight tagName="mark" attribute="taxation" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Travel and Connectivity: </b> 
        <Highlight tagName="mark" attribute="travel_connectivity" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Internet Access: </b> 
        <Highlight tagName="mark" attribute="internet_access" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Venture Capital: </b> 
        <Highlight tagName="mark" attribute="venture_capital" hit={props.hit} />
      </div>


      <div className="hit-description">
      <b>Venture Capital: </b> 
        <Highlight tagName="mark" attribute="venture_capital" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Restaurants: </b> 
        <Highlight tagName="mark" attribute="restaurants" hit={props.hit} />
      </div>
      

    </div>
  );
}

function RestaurantHit(props: any) {
  return (
    <div className="card">
      <div className="name">
      <b>Restaurant Name: </b> 
        <Highlight tagName="mark" attribute="name" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Phone Numbers: </b> 
        <Highlight tagName="mark" attribute="phone_numbers" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Address: </b> 
        <Highlight tagName="mark" attribute="address" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>City: </b> 
        <Highlight tagName="mark" attribute="city" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Zipcode: </b> 
        <Highlight tagName="mark" attribute="zipcode" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Highlights: </b> 
        <Highlight tagName="mark" attribute="highlights" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Price Range: </b> 
        <Highlight tagName="mark" attribute="price_range" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Average cost for two: </b> 
        <Highlight tagName="mark" attribute="average_cost_for_two" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Menu URL: </b> 
        <Highlight tagName="mark" attribute="menu_url" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Timings: </b> 
        <Highlight tagName="mark" attribute="timings" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Citie(s): </b> 
      <Highlight tagName="mark" attribute="city" hit={props.hit} />
      </div>

      <div className="hit-description">
      <b>Cuisine(s): </b> 
      <Highlight tagName="mark" attribute="cuisines" hit={props.hit} />
      </div>

    </div>
  );
}



function Search(query: any) {
  console.log("here");
  console.log("searching", query["q"]);
  const searchClient = algoliasearch(
    "2EZLZI9A68",
    "d04bf0d390cc40ca14eebcd6d0acea55"
  );

  return (
    <div>
      <h1>Search Results for {query["q"]}</h1>

      <InstantSearch
        indexName="cities"
        searchClient={searchClient}
        searchState={{ query: query["q"] }}
      >
        <div style={{ display: "none" }}>
          <SearchBox />
        </div>
        <Index indexName="cuisines">
          <h2>index: Cuisines</h2>
          <Hits hitComponent={CuisineHit} />
        </Index>
        <Index indexName="cities">
          <h2>index: Cities</h2>
          <Hits hitComponent={CityHit} />
        </Index>
        <Index indexName="restaurants">
          <h2>index: Restaurants</h2>
          <Hits hitComponent={RestaurantHit} />
        </Index>
      </InstantSearch>
    </div>
  );
}

export default Search;
