import React from "react";
import NavBar from "./components/NavBar";
import FooterLarge from "./components/FooterLarge";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import { Card, Button } from 'antd';

import Home from "./pages/Home/Home";
// import SplashCards from "./pages/Home/SplashCards";
import SplashVertical from "./pages/Home/SplashVertical";

import About from "./pages/About/About";
import Cuisines from "./pages/Cuisines/Cuisines";
import Cuisine from "./pages/Cuisines/Cuisine";
import Cities from "./pages/Cities/Cities";
import City from "./pages/Cities/City";
import Restaurants from "./pages/Restaurants/Restaurants";
import Restaurant from "./pages/Restaurants/Restaurant";

export default function App() {
  return (
    <div className="background full-height">
      <NavBar />
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
          </Switch>
        </div>
      </Router>
      {/* <FooterLarge></FooterLarge>    */}

    </div>
  );
}
