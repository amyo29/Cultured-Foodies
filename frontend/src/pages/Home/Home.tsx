import { Component } from "react";
import "../../styles/Home.css";
import homephoto from "../../static_resources/home/homephoto.jpg";

class Home extends Component {
  render() {
    return (
      <div>
        <body id="mybody" data-background={homephoto} className="Home">
          <header className="Home-header">
            <div className="Title-summary">
              Welcome!
              <div className="summary">
              Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? <br /> 
              Join us on a journey of culinary and cultural discovery that stretches through the ages and across the seas.
              <br />
              With information on delectable cuisines from around the world and where you can experience them in your city, 
              <br />
              as well as highlights on worldwide countries and U.S cities, <br />
              Cultured Foodies makes it easy for you to feast to your mind and stomach's content.
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
