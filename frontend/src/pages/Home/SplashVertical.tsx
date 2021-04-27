import React, { useRef } from "react";
import NavBar from "../../components/NavBar";
// import FooterLarge from "../../components/FooterLarge";
import "../../styles/SplashVertical.css";
import { BsCaretDownFill } from "react-icons/bs";
import Models from "./Models";

function SplashVertical() {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <div className="splashPage">
      <NavBar />
      <div className="splash">
        <div className="splashContent">
          <div className="headerText">
            <div className="title">Cultured Foodies</div>
            <div className="about">
              Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? Join
              us on a journey of culinary and cultural discovery that stretches
              through the ages and across the seas.
            </div>
          </div>

          <div className="arrow">
            <a href="#target">
              <BsCaretDownFill size={75} />
            </a>
          </div>

          <div ref={myRef} className="purpose">
            <div className="purpose-header">
              Explore the intersection of cuisine and culture.
            </div>
          </div>

          <div className="body" style={{ marginBottom: "100px" }}>
            <a id="target"></a>
            <Models />
          </div>
          <div></div>
        </div>
      </div>
      {/* <FooterLarge /> */}
      <footer className="footerbottom">
        {" "}
        <p>
          Author: Hege Refsnes
          <br />
          <a href="mailto:hege@example.com">hege@example.com</a>
        </p>
      </footer>
    </div>
  );
}

export default SplashVertical;
