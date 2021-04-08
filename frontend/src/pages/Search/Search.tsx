import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";

function Search(query: any) {
  console.log("searching", query);
  const searchClient = algoliasearch(
    "2EZLZI9A68",
    "d04bf0d390cc40ca14eebcd6d0acea55"
  );

  return (
    <div>
      <h1>Search Results for {query.q}</h1>


      <InstantSearch searchClient={searchClient} indexName="cities">
        <header>
          <SearchBox translations={{ placeholder: "Search Box" }} />
          {/* <Hits hitComponent={Hit} /> */}
        </header>
      </InstantSearch>
    </div>
  );
}

export default Search;
