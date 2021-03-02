import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './pages/About'
import Country from './pages/Country'
import News from './pages/News'
import Recipe from './pages/Recipe'
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/country">Model 1</Link>
            </li>
            <li>
              <Link to="/news">Model 3</Link>
            </li>
            <li>
              <Link to="/recipe">Model 2</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/country">
            <Country/>
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/recipe">
            <Recipe />
          </Route>
          <Route path="/">
            <Splash/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
