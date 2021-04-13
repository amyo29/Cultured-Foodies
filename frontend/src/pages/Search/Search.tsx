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
import { DialpadSharp } from "@material-ui/icons";
function CuisineHit(props: any) {
  console.log(props.hit)
  return (
    <div className="card">
      <div className="card-body align-self-start">
      <div className="name">
      <b>Name: </b> 
        <Highlight tagName="mark" attribute="name" hit={props.hit}/>
      </div>
      <div className="hit-description">
      <b>Country: </b> 
        <Highlight tagName="mark" attribute="country" hit={props.hit}/>
      </div>
      <div className="hit-description">
      <b>Cities: </b> 
        <Highlight tagName="mark" attribute="cities" hit={props.hit}/>
      </div>
      <div className="hit-description">
      <b>Restaurants: </b> 
        <Highlight tagName="mark" attribute="restaurants" hit={props.hit}/>
      </div>
      <div className="hit-description">
      <b>Description: </b> 
        <Highlight tagName="mark" attribute="description" hit={props.hit}/>
      </div>
      <div className="hit-description">
      <b>Dishes: </b> 
          {props.hit.dishes.map((dish: any, counter: any) => (
            <li key={counter}><Highlight tagName = "mark" attribute={`dishes[${counter}].name`} hit={props.hit} /></li>
          ))}
      </div>
      <div className="hit-description">
      <b>Country Info: </b> 
          {props.hit.country_data.map((country: any, counter: any) => (
            <>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].capital`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].alpha3code`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].region`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].subregion`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].latitude`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].longitude`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].area`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].population`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].borders`} hit={props.hit} /></li>
            <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].timezones`} hit={props.hit} /></li>
            {props.hit.country_data[counter].translations.map((translation:any, index: any) => (
              <li key={counter}><Highlight tagName = "mark" attribute={`country_data[${counter}].translations[${index}].br`} hit={props.hit} /></li>
            ))}
            </>
            
          ))}
      </div>
      </div>
    </div>
  );
}
function CityHit(props: any) {
  return (
    <div className="card">
      <div className="name">
        <b>Full Name: </b> 
        <Highlight tagName="mark" attribute="full_name" hit={props.hit}/>
      </div>

      <div className="hit-description">
      <b>Description: </b> 
        <Highlight tagName="mark" attribute="summary" hit={props.hit} />
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

    </div>
  );
}

function RestaurantHit(props: any) {
  return (
    <div className="card">
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
