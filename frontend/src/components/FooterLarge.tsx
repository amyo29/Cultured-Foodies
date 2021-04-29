import "../styles/FooterLarge.css"  

function FooterLarge() {
	return (
		<footer className="footer">
			{/* Container with 3 columns */}
			<div className='container'>
				{/* Long column with site name and description */}
				<div className='footerDataLong'>
					<h1 className='header1'>Cultured Foodies</h1>
						Explore the intersection of cuisine and culture.
						<br/>
				</div>
				
				{/* Short column with other links */}
				{/* Short column with models */}
				<div className='footerDataShort'>
					<h1 className='header2'>Models</h1>
					<a href="/cuisines">Cuisines</a>
					<a href="/cities">Cities</a>
					<a href="/restaurants">Restaurants</a>
					<br/>
				</div>
				<div className='footerDataShort'>
					<h1 className='header2'>Other Links</h1>
					<a href="/about">About</a>
					<a href="/visualizations">Visualizations</a>
					<a href="/provider-visualizations">Provider's Visualizations</a>
					<br/>
				</div>
				
			</div>
			{/* Bottom of footer: website copyright */}

			<div className='copyrightText' style={{fontSize: "large"}}>
			
				Copyright © 2021 Cultured Foodies
			</div>   
		</footer>
	)
}

export default FooterLarge
