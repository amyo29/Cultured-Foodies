import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Countries from "./pages/Countries/Countries";
import Dishes from "./pages/Dishes/Dishes";
import Dish from "./pages/Dishes/Dish";
import News from "./pages/News/News";
import Country from "./pages/Countries/Country"

export default function App() {
  return (
    <div>
      <NavBar />
      <Router>
          <div>
            <Route exact path="/">
              <Home />
            </Route>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route exact path="/countries">
                <Countries />
              </Route> 
              <Route path="/countries/:id">
                <Country/>                
              </Route>
              <Route exact path="/dishes">
                <Dishes />
              </Route>
              <Route path="/dishes/:id">
                <Dish />
              </Route>
              <Route path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer></Footer>
    </div>
  );
}
