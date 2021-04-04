/*
    This file defines a the footer displayed on all pages
*/

import React from "react"
import styles from "../styles/FooterLarge.module.css"  
import { BrowserRouter as Router, Route, Link, BrowserRouter  } from "react-router-dom"

const FooterLarge = () => {
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
							<Link to="/cuisines">Cuisines</Link>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<Link to="/cities">Cities</Link>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<Link to="/restaurants">Restaurants</Link>
						</BrowserRouter>
					</div>
				</div>
				{/* Short column with other links */}
				<div className={styles.footerDataShort}>
					<h1 className={styles.otherLinksHeader}>Other Links</h1>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<Link to="/">Home</Link>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
							<Link to="/about">About</Link>
						</BrowserRouter>
					</div>
					<div className={styles.footerLinkContainer}>
						<BrowserRouter>
						<Link to="/">Visualizations</Link>
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
