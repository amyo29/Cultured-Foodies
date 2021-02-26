import React from 'react';
import {Button} from 'react-bootstrap';

function Homepage() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Project Lift Off!
        <Button href='/about'>Link to About US</Button>
      </header>
    </div>
  );
}

export default Homepage;