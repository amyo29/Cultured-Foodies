import React from "react";
import styles from "../../styles/SplashVertical.module.css"   
import { Card, Avatar, Typography, Button } from "antd"

import { BsCaretDown } from "react-icons/bs";
import Models from "./Models";

const { Title, Paragraph } = Typography

function SplashVertical(){
    function click(){
        window.scrollTo({top:650, left: 0, behavior:'smooth'});
    }
    return (
        // <div className="Landing">
        //     <header className="Landing-header">
        //         <div style={{marginTop:"150px"}}>
        //             <h3>Relocccate</h3>
        //             <h1>To anywhere you want</h1>
        //         </div>
        //         <div className="arrow">
        //             {/* <BsCaretDown size={75} onClick={()=>click()}/> */}
        //             <BsCaretDown size={75} />   

        //         </div>
        //     </header>
        //     <div className="body">
        //         <div className="purpose">
        //             <div className="purpose-header">
        //                 Make your move easier
        //                 <Models />
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className={styles.splashPage}>
			<div className={styles.splash}>
				<div className={styles.splashContent}>
					<div className={styles.headerText}>
						<Title level={1} className={styles.title}>
							Cultured Foodies
						</Title>
						<Paragraph className={styles.about}>
                        Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? 
                        Join us on a journey of culinary and cultural discovery that 
                        stretches through the ages and across the seas.
						</Paragraph>
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