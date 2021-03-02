import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
              <Link to="/model_1">Model 1</Link>
            </li>
            <li>
              <Link to="/model_2">Model 2</Link>
            </li>
            <li>
              <Link to="/model_3">Model 3</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/model_1">
            <Model_1 />
          </Route>
          <Route path="/model_2">
            <Model_2 />
          </Route>
          <Route path="/model_3">
            <Model_3 />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return (
    <div>
      <h2>
        About
      </h2>
      <td>
        <p>
          <b>one</b> page
        </p>
        <ul>
          <li>description of the site, its purpose, its intended users</li>
          <li>explanation of the interesting result of integrating disparate data</li>
          <li>the group members</li>
          <li>for each member
          <ul>
              <li>name</li>
              <li>photo</li>
              <li>bio</li>
              <li>major responsibilities</li>
              <li>no. of commits</li>
              <li>no. of issues</li>
              <li>no. of unit tests</li>
            </ul>
          </li>
          <li>stats
          <ul>
              <li>total no. of commits</li>
              <li>total no. of issues</li>
              <li>total no. of unit tests</li>
            </ul>
          </li>
          <li>data
          <ul>
              <li>links to the data <b>sources</b></li>
              <li>description of <b>how</b> each was <b>scraped</b></li>
            </ul>
          </li>
          <li>tools
          <ul>
              <li>tools used</li>
              <li>describe their use</li>
              <li>special focus on optional tools that were <b>not</b> required</li>
            </ul>
          </li>
          <li>a link to the <a href="https://gitlab.com">GitLab</a> repo</li>
          <li>a link to the <a href="https://www.postman.com">Postman</a> API</li>
        </ul>
      </td>
    </div>
  );
}

function Model_1() {
  return <h2>Model 1</h2>;
}

function Model_2() {
  return <h2>Model 2</h2>;
}

function Model_3() {
  return <h2>Model 3</h2>;
}