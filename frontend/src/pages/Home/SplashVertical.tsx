import { useRef } from "react";
import NavBar from "../../components/NavBar";
import FooterLarge from "../../components/FooterLarge";
import "../../styles/SplashVertical.css";
import { BsCaretDownFill } from "react-icons/bs";
import Models from "./Models";
import { relative } from "node:path";

function SplashVertical() {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <>
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
        </div>
        <div ref={myRef} className="purpose bottom-centered">
        <div className="arrow">
            <a href="#target">
              <BsCaretDownFill size={75} />
            </a>
          </div>
        <div className="purpose-header">
          Explore the intersection of cuisine and culture.
        </div>
      </div>
      </div>
      <div className="body">
        <a id="target"></a>
        <Models />
      </div>
      <FooterLarge />
    </>
  );
}

export default SplashVertical;
