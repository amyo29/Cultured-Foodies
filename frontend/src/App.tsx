import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './pages/About'
import Country from './pages/Countries'
import Recipes from './pages/Recipes'
import News from './pages/News'
import Splash from './pages/Splash'


export default function App() {
  return (
    <Router>
      <div>
        <h1>
          Welcome to Cultured Foodies!
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/countries">Countries</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/countries">
            <Country/>
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/">
            <Splash/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
