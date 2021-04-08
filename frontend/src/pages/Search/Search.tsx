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
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  );

  return (
    <div>
      <h1>Search Results for {query.q}</h1>
      {/* <InstantSearch
    appId="2EZLZI9A68"
    apiKey="d04bf0d390cc40ca14eebcd6d0acea55"
    indexName="bestbuy"
  > */}

      <InstantSearch searchClient={searchClient} indexName="instant_search">
        <header>
          <SearchBox translations={{ placeholder: "Search Box" }} />
          {/* <Hits hitComponent={Hit} /> */}
        </header>
      </InstantSearch>
    </div>
  );
}

export default Search;
