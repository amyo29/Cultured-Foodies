
import React from 'react';
import ReactDOM from 'react-dom';

//import { expect } from 'chai';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import App from "../App";
import NavBar from "../components/NavBar";  
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Restaurants from "../pages/Restaurants/Restaurants";
import Restaurant from "../pages/Restaurants/Restaurant";
import Cities from "../pages/Cities/Cities";
import City from "../pages/Cities/City";
import Cuisines from "../pages/Cuisines/Cuisines";
import Cuisine from "../pages/Cuisines/Cuisine";

  
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('<Navigation />', () => {
	it('renders a Navigation Bar', () => {
	  const nav = shallow(<NavBar />);

      expect(nav).toMatchSnapshot();
	  
	});
});

// it('Cities', async () => {
//     const component = shallow(<Cities/>);
//     const data = component.instance();
//     data.componentDidMount();
//     expect(component).toMatchSnapshot();	
  
//   });
  
// it('City', async () => {
//     const component = shallow(<City/>);
//     const data = component.instance();
//     await data.componentDidMount();
//     expect(component).toMatchSnapshot();
// });
  

describe("Render views", () => {
	// test for Splash and About
	test('Splash Page', () => {
		const component = shallow(<Home />);
		expect(component).toMatchSnapshot();
	});
	test('About', () => {
		const component = shallow(<About />);
		expect(component).toMatchSnapshot();
	});
	// tests for model pages
	test('Restaurants', () => {
		const component = shallow(<Restaurants />);
		expect(component).toMatchSnapshot();
	});
	test('Cities', () => {
		const component = shallow(<Cities />);
		expect(component).toMatchSnapshot();
	});
	test('Cuisines', () => {
		const component = shallow(<Cuisines />);
		expect(component).toMatchSnapshot();
	});
	// tests for instance pages
	// need to restructure frontend to make these tests pass
	//     TypeError: Cannot read property 'match' of undefined
	// this error is due to using useParams from react-router (see https://stackoverflow.com/questions/59153898/typeerror-cannot-read-property-match-of-undefined-when-using-useparams-from-r)
	
	// test('Restaurant', () => {
	// 	const component = shallow(<Restaurant/>);
	// 	expect(component).toMatchSnapshot();
	// });
	// test('City', () => {
	// 	const component = shallow(<City/>);
	// 	expect(component).toMatchSnapshot();
	// });
	// test('Cuisine', () => {
	// 	const component = shallow(<Cuisine/>);
	// 	expect(component).toMatchSnapshot();
	// });
})

/* about page test 
it('Get About Page', async () => {
	const copy = shallow(<About />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(11);
});
*/
