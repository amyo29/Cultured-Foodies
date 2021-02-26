import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/About'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/about" component={About}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;