import React, { useRef } from "react";
import NavBar from "../../components/NavBar";
import FooterLarge from "../../components/FooterLarge";

import styles from "../../styles/SplashVertical.module.css";

import { BsCaretDownFill } from "react-icons/bs";
import Models from "./Models";
import CSS from "csstype";

function SplashVertical() {
  // function click(){
  //     window.scrollTo({top: 700, left: 0, behavior: 'smooth'});
  // }

  const myRef = useRef<HTMLDivElement>(null);

  // const executeScroll = () => myRef.current.scrollIntoView()
  return (
    <div className={styles.splashPage}>
      <NavBar />
      <div className={styles.splash}>
        <div className={styles.splashContent}>
          <div className={styles.headerText}>
            <div className={styles.title}>Cultured Foodies</div>
            <div className={styles.about}>
              Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? Join
              us on a journey of culinary and cultural discovery that stretches
              through the ages and across the seas.
            </div>
          </div>

          <div className={styles.arrow}>
            <a href="#target">
              {/* <BsCaretDown size={75} onClick={()=>click()}/> */}
              <BsCaretDownFill size={75} />
            </a>
          </div>

          <div ref={myRef} className={styles.purpose}>
            <div className="purpose-header">
              Explore the intersection of cuisine and culture.
            </div>
          </div>

          <div className={styles.body}>
            <a id="target"></a>
            <Models />
          </div>

          <div></div>
        </div>
      </div>
      <FooterLarge />
    </div>
  );
}

export default SplashVertical;
