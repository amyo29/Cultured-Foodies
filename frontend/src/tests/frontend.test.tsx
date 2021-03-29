
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

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

// test App
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// test Nav Bar component
describe('<Navigation />', () => {
	it('renders a Navigation Bar', () => {
	  const nav = shallow(<NavBar />);

      expect(nav).toMatchSnapshot();
	  
	});
});
  
// test Views
describe("Render views", () => {
	// test Splash page
	test('Splash Page', () => {
		const component = shallow(<Home />);
		expect(component).toMatchSnapshot();
	});
	// test About page
	test('About Page', () => {
		const component = shallow(<About />);
		expect(component).toMatchSnapshot();
	});
	// tests for model pages
	test('Restaurants model page', () => {
		const component = shallow(<Restaurants />);
		expect(component).toMatchSnapshot();
	});
	test('Cities model page', () => {
		const component = shallow(<Cities />);
		expect(component).toMatchSnapshot();
	});
	test('Cuisines model page', () => {
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

