// import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
// import Image from "react-bootstrap/Image";

import Cuisines from "../../static_resources/cuisineModel.jpg"       
import Cities from "../../static_resources/cityModel.jpg"
import Restaurants from "../../static_resources/restaurantModel.jpg"
import "../../styles/Models.css";

/* used to display model page buttons
on landing page */
function Models() {
  /* display the three model buttons */
  return (
    <div className="row pt-5 justify-content-md-center mx-0">
        <div className="col-lg-5 ">
          <NavLink to="/cities">
            <img
              src={Cities}
              className="rounded-circle mx-auto d-block mb-5"
              alt="cities"
              style={{ width: "30rem" }}
            ></img>
          </NavLink>
        </div>
        <div className="col-lg-5" style={{ marginTop: "5rem" }}>
          <h1 className="cities-text">
           Learn about your city
          </h1>
        </div>

        <div className="row pt-5 justify-content-md-center">
        <div
          className="col-lg-5 order-last order-lg-first"
          style={{ marginTop: "5rem" }}
        >
          <h1 className="font-weight-bold text-center p-4">
            
          </h1>
          <h5 className="counties-text">
            Explore worldwide cuisines
          </h5>
        </div>

        <div className="col-lg-4">
          <NavLink to="/cuisines">
            <img
              src={Cuisines}
              className="rounded-circle mx-auto d-block mb-5 "
              alt="cuisines"
              style={{ width: "30rem" , height: "30rem"}}
            ></img>
          </NavLink>
        </div>
      </div>

      <div className="row pt-5 justify-content-md-center mx-0">
        <div className="col-lg-5 ">
          <NavLink to="/restaurants">
            <img
              src={Restaurants}
              className="rounded-circle mx-auto d-block mb-5"
              alt="Restaurants"
              style={{ width: "30rem", height: "30rem" }}
            ></img>
          </NavLink>
        </div>
        <div className="col-lg-5" style={{ marginTop: "5rem" }}>
          <h1 className="cities-text">
            Find restaurants
          </h1>  
        </div>
      </div>
    </div>
  );
}

export default Models;