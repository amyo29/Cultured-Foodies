
import React from 'react';
//import { expect } from 'chai';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Restaurants from "../pages/Restaurants/Restaurants";
import Restaurant from "../pages/Restaurants/Restaurant";
import Cities from "../pages/Cities/Cities";
import City from "../pages/Cities/City";
import Cuisines from "../pages/Cuisines/Cuisines";
import Cuisine from "../pages/Cuisines/Cuisine";


Enzyme.configure({
    adapter: new Adapter(),
})

describe("Render views", () => {
	test('Splash Page', () => {
		const component = shallow(<Home />);
		expect(component).toMatchSnapshot();
	});
	test('About', () => {
		const component = shallow(<About />);
		expect(component).toMatchSnapshot();
	});
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
