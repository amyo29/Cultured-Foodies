import Cuisines from "../../static_resources/home/cuisineModel.jpg";
import Cities from "../../static_resources/home/cityModel.jpg";
import Restaurants from "../../static_resources/home/restaurantModel4.jpg";
import "../../styles/Models.css";

/* used to display model page buttons
on landing page */
function Models() {
  /* display the three model buttons */
  return (
    <div className="row pt-5 justify-content-md-center mx-0">
      <div className="model-container col-lg-5 ">
        <a href="/cuisines">
          <img
            src={Cuisines}
            className="rounded-circle mx-auto d-block mb-5"
            alt="cuisines"
            style={{ width: "30rem", height: "30rem" }}
          ></img>
        </a>
      </div>
      <div className="col-lg-5" style={{ marginTop: "5rem" }}>
        <h1 className="models-text">Explore worldwide cuisines</h1>
      </div>

      <div className="row pt-5 justify-content-md-center">
        <div
          className="col-lg-5 order-last order-lg-first"
          style={{ marginTop: "5rem" }}
        >
          <h1 className="font-weight-bold text-center p-4"></h1>
          <h5 className="cities-text">Learn about your city</h5>
        </div>

        <div className="model-container col-lg-4">
          <a href="/cities">
            <img
              src={Cities}
              className="rounded-circle mx-auto d-block mb-5 "
              alt="cities"
              style={{ width: "30rem", height: "30rem" }}
            ></img>
          </a>
        </div>
      </div>

      <div className="row pt-5 justify-content-md-center mx-0">
        <div className="model-container col-lg-5 ">
          <a href="/restaurants">
            <img
              src={Restaurants}
              className="rounded-circle mx-auto d-block mb-5"
              alt="Restaurants"
              style={{ width: "30rem", height: "30rem" }}
            ></img>
          </a>
        </div>
        <div className="col-lg-5" style={{ marginTop: "5rem" }}>
          <h1 className="models-text">Find restaurants</h1>
        </div>
      </div>
    </div>
  );
}

export default Models;
