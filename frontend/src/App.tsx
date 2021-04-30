import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import SplashVertical from "./pages/Home/SplashVertical";
import About from "./pages/About/About";
import Cuisines from "./pages/Cuisines/Cuisines";
import Cuisine from "./pages/Cuisines/Cuisine";
import Cities from "./pages/Cities/Cities";
import City from "./pages/Cities/City";
import Restaurants from "./pages/Restaurants/Restaurants";
import Restaurant from "./pages/Restaurants/Restaurant";
import Search from "./pages/Search/Search";
import Visualization from "./pages/Visualizations";
import ProviderVisualizations from "./pages/ProviderVisualizations";

export default function App() {
  return (
    <div className="background full-height">
      <Router>
        <div>
          <Route exact path="/">
            <SplashVertical />
          </Route>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route exact path="/cuisines">
              <Cuisines />
            </Route>
            <Route
              path="/cuisines/:id"
              render={(props) => <Cuisine id={props.match.params.id} />}
            />
            <Route exact path="/cities">
              <Cities />
            </Route>
            <Route
              path="/cities/:id"
              render={(props) => <City id={props.match.params.id} />}
            />
            <Route exact path="/restaurants">
              <Restaurants />
            </Route>
            <Route
              path="/restaurants/:id"
              render={(props) => <Restaurant id={props.match.params.id} />}
            />
            <Route path="/visualizations">
              <Visualization />
            </Route>
            <Route path="/provider-visualizations">
              <ProviderVisualizations />
            </Route>
            <Route
              path="/search/query=:q"
              render={(props) => <Search q={props.match.params.q} />}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
