import React, { Component } from "react";
import "../../styles/Home.css";
import homephoto from "../../static_resources/homephoto.jpg";

class Home extends Component {
  render() {
    return (
      <div>
        <body id="mybody" data-background={homephoto} className="Home">
          <header className="Home-header">
            <div className="Title-summary">
              Welcome fellow Foodie!
              <div className="summary">
                Whether you are looking for cultural dishes
                <br />
                around the world, country information, dishes <br />
                or global news, Cultured Foodies <br />
                can help you find what you're looking for!
                <br />
              </div>
            </div>
          </header>
        </body>
      </div>
    );
  }
}

export default Home;
