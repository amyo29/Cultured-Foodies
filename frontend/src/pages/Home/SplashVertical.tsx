import React from "react";
import styles from "../../styles/SplashVertical.module.css"   

import { BsCaretDown } from "react-icons/bs";
import Models from "./Models";

function SplashVertical(){
    function click(){
        window.scrollTo({top:650, left: 0, behavior:'smooth'});
    }
    return (

        <div className={styles.splashPage}>
			<div className={styles.splash}>
				<div className={styles.splashContent}>
					<div className={styles.headerText}>
                        <div className={styles.title}>
                            Cultured Foodies
                        </div>
                        <div className={styles.about}>
                            Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? 
                            Join us on a journey of culinary and cultural discovery that 
                            stretches through the ages and across the seas.
						</div>  
					</div>

                    <div className={styles.arrow}>  
                       {/* <BsCaretDown size={75} onClick={()=>click()}/> */}
                       <BsCaretDown size={75} />   

                    </div>

                    <div className={styles.body}>
                        <div className={styles.purpose}>
                            <div className="purpose-header">
                                Explore the intersection of cuisine and culture.
                                <Models />   
                            </div>
                        </div>
                    </div>
	
				</div>
            </div>
        </div>
      );
    
}

export default SplashVertical;