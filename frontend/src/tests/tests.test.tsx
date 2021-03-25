
import React from 'react';
//import { expect } from 'chai';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import About from "../pages/About/About";

Enzyme.configure({
    adapter: new Adapter(),
})

test('renders the component', () => {
	const component = shallow(<About />);
	expect(component).toMatchSnapshot();
});

/* about page test 
it('Get About Page', async () => {
	const copy = shallow(<About />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(11);
});
*/
