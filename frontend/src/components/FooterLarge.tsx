import "../styles/FooterLarge.css"  

function FooterLarge() {
	return (
		<div className='footer'>
			{/* Container with 3 columns */}
			<div className='container'>
				{/* Long column with site name and description */}
				<div className='footerDataLong'>
					<h1 className='header1'>Cultured Foodies</h1>
						Explore the intersection of cuisine and culture.
				</div>
				
				{/* Short column with other links */}
				{/* Short column with models */}
				<div className='footerDataShort'>
					<h1 className='header2'>Models</h1>
					<a href="/cuisines">Cuisines</a>
					<a href="/cities">Cities</a>
					<a href="/restaurants">Restaurants</a>
				</div>
				<div className='footerDataShort'>
					<h1 className='header2'>Other Links</h1><br/>
					<a href="/about">About</a>
					<a href="/visualizations">Visualizations</a>
					<a href="/provider-visualizations">Provider's Visualizations</a>

				</div>
				
			</div>
			{/* Bottom of footer: website copyright */}
			<h3 className='copyrightText'>
				Copyright © 2021 Cultured Foodies
			</h3>
		</div>
	)
}

export default FooterLarge
