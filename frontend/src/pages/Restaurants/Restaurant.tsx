import { useEffect, useState } from "react";
import "../../styles/Restaurant.css";
import NavBarSolid from "../../components/NavBarSolid";
import useAxios from "axios-hooks";
function Restaurant(id: any) {
  useEffect(() => {
    document.title = "Restaurant";
  }, []);
  const [{ data }] = useAxios("/api/restaurants/id=" + id.id);
  const [restaurant, setRestaurant] = useState<RestaurantInstance>();
  useEffect(() => {
    const restaurantObj: RestaurantInstance = data as RestaurantInstance;
    if (restaurantObj) {
      setRestaurant(restaurantObj);
    }
  }, [data]);

  //render: map long/lat or city names to render map
  let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  let restaurantMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    API_KEY +
    "&q=" +
    restaurant?.name.replace("&", "%20")
    +
    restaurant?.address.replace("&", "%20");

  let averageRating = (parseInt(restaurant?.aggregate_rating!) === 0) ? "No Data" : restaurant?.aggregate_rating
  let averageCostForTwo = (restaurant?.average_cost_for_two === 0) ? "No Data" : "$" + restaurant?.average_cost_for_two

  return (

    <div>
      <NavBarSolid />
      <body className="Instance center-div">
        <h2 className="Instance-header">{restaurant?.name}</h2>
        <div className="info" align-items="center">
          <div className="row">
            <div className="col">
            <div className="card">
              <img
                src={restaurant?.restaurant_image}
                alt=""
                className="restaurant-card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{restaurant?.name}</h5>
                <p className="card-text">Phone Number: {restaurant?.phone_numbers}</p>
                <p className="card-text">Address: {restaurant?.address}</p>
                <p className="card-text">City: {restaurant?.city}</p>
                <p className="card-text">Zipcode: {restaurant?.zipcode}</p>
                <p className="card-text">
                  Average Rating: {averageRating}
                </p>
                <p className="card-text">Highlights: {restaurant?.highlights}</p>
                <p className="card-text">Price Range: {restaurant?.price_range}</p>
                <p className="card-text">Average Cost for Two: {averageCostForTwo}</p>
                <p className="card-text">Timings: {restaurant?.timings}</p>
                <p className="card-text">
                  Menu: 
                  {
                    <a href={restaurant?.menu_url}>
                      {" "} 
                      {restaurant?.menu_url}
                      <br />
                    </a>
                  }
                </p>
                <p className="card-text">
                  Cities which have this restaurant:
                  {
                    <a href={"/cities/" + restaurant?.city_id}>
                      {" "}
                      {restaurant?.city}
                      <br />
                    </a>
                  }
                </p>
                Cuisines for this restaurant: <br />
                {restaurant?.cuisines ? (
                  restaurant?.cuisines?.split(", ").map((c, index) =>
                    restaurant?.cuisine_ids.split(", ")[index] !== "-1" ? (
                      <a
                        href={
                          "/cuisines/" +
                          restaurant?.cuisine_ids.split(", ")[index]
                        }
                      >
                        {c}
                        <br />
                      </a>
                    ) : (
                      <a>
                        {c}
                        <br />
                      </a>
                    )
                  )
                ) : (
                  <p>loading</p>
                )}
                <p className="card-text"></p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </body>
      <div className="center">
        <h4>Map Location</h4>
        <div className="map-responsive">
        <iframe
          title="Restaurant Map"
          src={restaurantMapURL}
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
        </div>
      </div>
    </div>
    
  );
}

export interface RestaurantObject {
  restaurants: RestaurantInstance[];
}
export interface RestaurantInstance {
  address: string;
  aggregate_rating: string;
  average_cost_for_two: number;
  city: string;
  cuisines: string;
  highlights: string;
  id: number;
  latitude: string;
  longitude: string;
  menu_url: string;
  name: string;
  phone_numbers: string;
  price_range: number;
  restaurant_image: string;
  state_abbrev: string;
  timings: string;
  url: string;
  zipcode: string;
  city_id: string;
  cuisine_ids: string;
}
export default Restaurant;
