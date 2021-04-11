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
    <div>
      <div className="name">
        <Highlight tagName="mark" attribute="name" hit={props.hit}/>
      </div>
    </div>
  );
}
function CityHit(props: any) {
  return (
    <div className="card">
      <div className="name">
        <Highlight tagName="mark" attribute="name" hit={props.hit}/>
      </div>
      <div className="hit-description">
        <Highlight tagName="mark" attribute="summary" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight tagName="mark" attribute="state" hit={props.hit} />
      </div>
    </div>
  );
}

function RestaurantHit(props: any) {
  return (
    <div>
      <div className="name">
        <Highlight tagName="mark" attribute="name" hit={props.hit} />
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
