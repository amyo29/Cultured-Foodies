import React, { FC, Component, ComponentType, useState, useEffect, useRef, MutableRefObject } from "react"
import { Card, Avatar, Typography, Button } from "antd"
// import Card from "react-bootstrap/Card";

import { DownOutlined } from "@ant-design/icons"
import { Link, useHistory } from "react-router-dom"  

import Cuisines from "../../static_resources/cuisineModel.jpg"       
import Cities from "../../static_resources/cityModel.jpg"
import Restaurants from "../../static_resources/restaurantModel.jpg"

import styles from "../../styles/Splash.module.css"   
// import GeneralSearchBar, { AddressSearchBar } from "../Search/GeneralSearchBar"
// import { getAPI } from "library/APIClient"

const { Title, Paragraph } = Typography
const { Meta } = Card;
// const ref = useRef<HTMLDivElement>(null);    

class Splash extends Component {
    render() {
// const Splash: FC = () => {   
    // const ref = useRef(null)
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
			<div className={styles.modelCards} >
				<Title level={1} style={{ textAlign: "center", marginTop: 32 }}>
					Model Pages
				</Title>
				<div className={styles.cardFlexContainer}>
					<Link
						id="cuisineCard"
						to="/cuisines/"
						className={styles.card}
					>
                        <Card.Meta className={styles.card}>
                            {/* avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} */}
                                title="Card title"
                                description="This is the description"
                        </Card.Meta>
						{/* <Card className={styles.card}
							bordered={true}  
							
							cover={
								<img
									className={styles.cardImage}
									alt={"Cuisines"}
									src={Cuisines}
								></img>
							}
							hoverable={true}
						>
							<Title level={2} style={{ textAlign: "center" }}>
								Cuisines
							</Title>
							<Paragraph>
								Want to learn more about cuisines around the world?
							</Paragraph>
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Card title"
                                description="This is the description"    
                                />
						</Card>    */}
					</Link>
					<Link
						id="cityCard"
						to="/cities/"
						className={styles.card}
					>
						<Card.Meta
							// bordered={true}
							className={styles.card}
							cover={
								<img
									className={styles.cardImage}
									alt={"City"}
									src={Cities}
								></img>
							}
							hoverable={true}
						>
							<Title level={2} style={{ textAlign: "center" }}>
								Cities
							</Title>
							<Paragraph>
								Which city are you in? Learn about your city as well as cities across the U.S.!
							</Paragraph>
						</Card.Meta>
					</Link>
					<Link
						id="restaurantCard"
						to="/restaurants/"
						className={styles.card}
					>
						<Card.Meta
							// bordered={true}
							className={styles.card}
							cover={
								<img
									className={styles.cardImage}
									alt={"Restaurant"}
									src={Restaurants}
								></img>
							}
							hoverable={true}
						>
							<Title level={2} style={{ textAlign: "center" }}>
								Restaurants
							</Title>
							<Paragraph>
								Find nearby restaurants which serve your favourite cuisines!   
							</Paragraph>
						</Card.Meta>      
					</Link>
				</div>
			</div>
		
		</div>
	)
    }
}

export default Splash;
