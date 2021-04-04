import React, { FC, ComponentType, useState, useEffect, useRef, MutableRefObject } from "react"
import { Typography, Card, Button } from "antd"
// import Card from "react-bootstrap/Card";

import { DownOutlined } from "@ant-design/icons"
import { Link, useHistory } from "react-router-dom"

import Districts from "../../static_resources/cuisineModel.jpg"       
import Politicians from "../../static_resources/cityModel.jpg"
import Elections from "../../static_resources/restaurantModel.jpg"

import styles from "../../styles/Splash.module.css"   
// import GeneralSearchBar, { AddressSearchBar } from "../Search/GeneralSearchBar"
// import { getAPI } from "library/APIClient"

const { Title, Paragraph } = Typography
const { Meta } = Card;

const Splash: FC = () => {   
    // const ref = useRef(null)
    const ref = useRef<HTMLDivElement>(null);    
    // const ref = useRef() as MutableRefObject<HTMLDivElement>; 
	return (
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
	
				</div>
				{/* <div className={styles.downButton}>
					<DownOutlined
						className={styles.downButtonIcon}
						onClick={() => {
							window.scrollTo({
								top: ref.current !== null ? ref.current.offsetTop : 100,
								behavior: "smooth",
							})
						}}
					/>
				</div>       */}
			</div>
			<div className={styles.modelCards} ref={ref}>
				<Title level={1} style={{ textAlign: "center", marginTop: 32 }}>
					Model Pages
				</Title>
				<div className={styles.cardFlexContainer}>
					<Link
						id="politicianCard"
						to="/politicians/view"
						className={styles.card}
					>
						<Card.Meta className={styles.card}
							bordered={true}  
							
							cover={
								<img
									className={styles.cardImage}
									alt={"Politician"}
									src={Politicians}
								></img>
							}
							hoverable={true}
						>
							<Title level={2} style={{ textAlign: "center" }}>
								Politicians
							</Title>
							<Paragraph>
								Want to learn more about your politicians?
							</Paragraph>
						</Card.Meta>
					</Link>
					<Link
						id="districtCard"
						to="/districts/view"
						className={styles.card}
					>
						<Card.Meta
							// bordered={true}
							className={styles.card}
							cover={
								<img
									className={styles.cardImage}
									alt={"Texas"}
									src={Districts}
								></img>
							}
							hoverable={true}
						>
							<Title level={2} style={{ textAlign: "center" }}>
								Districts
							</Title>
							<Paragraph>
								Which district are you in? Learn about the
								different districts across Texas!
							</Paragraph>
						</Card.Meta>
					</Link>
					<Link
						id="electionCard"
						to="/elections/view"
						className={styles.card}
					>
						<Card.Meta
							// bordered={true}
							className={styles.card}
							cover={
								<img
									className={styles.cardImage}
									alt={"Vote"}
									src={Elections}
								></img>
							}
							hoverable={true}
						>
							<Title level={2} style={{ textAlign: "center" }}>
								Elections
							</Title>
							<Paragraph>
								What are some of the upcoming elections? Keep
								track of the elections and mark your calendars
								to vote!   
							</Paragraph>
						</Card.Meta>      
					</Link>
				</div>
			</div>
		
		</div>
	)
}

export default Splash
