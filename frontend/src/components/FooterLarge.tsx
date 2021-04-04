/*
    This file defines a the footer displayed on all pages
*/

import React from "react"
import styles from "../styles/FooterLarge.module.css"  
// import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, NavLink, Link, BrowserRouter  } from "react-router-dom"

function FooterLarge() {
	return (
		<div className={styles.footer}>
			{/* Container with 3 columns */}
			<div className={styles.container}>
				{/* Long column with site name and description */}
				<div className={styles.footerDataLong}>
					<h1 className={styles.siteName}>Cultured Foodies</h1>
					<div className={styles.siteText}>
						Explore the intersection of cuisine and culture.
					</div>
				</div>
				{/* Short column with models */}
				<div className={styles.footerDataShort}>
					<h1 className={styles.modelHeader}>Models</h1>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<NavLink to="/cuisines">Cuisines</NavLink>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<NavLink to="/cities">Cities</NavLink>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<NavLink to="/restaurants">Restaurants</NavLink>
						</BrowserRouter>
					</div>
				</div>
				{/* Short column with other links */}
				<div className={styles.footerDataShort}>
					<h1 className={styles.otherLinksHeader}>Other Links</h1>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<NavLink to="/">Home</NavLink>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<NavLink to="/about">About</NavLink>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
						<NavLink to="/">Visualizations</NavLink>
						</BrowserRouter>
					</div>
				</div>
			</div>
			{/* Bottom of footer: website copyright */}
			<h3 className={styles.copyrightText}>
				{" "}
				Copyright © 2021 Cultured Foodies
			</h3>
		</div>
	)
}

export default FooterLarge
