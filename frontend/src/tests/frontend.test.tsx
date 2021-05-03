
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import App from "../App";
import NavBar from "../components/NavBar";  
import SplashVertical from "../pages/Home/SplashVertical"; 
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
		const component = shallow(<SplashVertical />);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});
	// test About page
	test('About Page', () => {
		const component = shallow(<About />);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
	});
	// tests for model pages
	test('Restaurants model page', () => {
		const component = shallow(<Restaurants />);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});
	test('Cities model page', () => {
		const component = shallow(<Cities />);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});
	test('Cuisines model page', () => {
		const component = shallow(<Cuisines />);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});
	
	// Update for below comments: Fixed by correctly restructuring frontend
	// need to restructure frontend to make these tests pass
	//     TypeError: Cannot read property 'match' of undefined
	// this error is due to using useParams from react-router (see https://stackoverflow.com/questions/59153898/typeerror-cannot-read-property-match-of-undefined-when-using-useparams-from-r)
	
	// tests for instance pages
	test('Restaurant instance page', () => {
		const component = shallow(<Restaurant/>);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});
	test('City instance page', () => {
		const component = shallow(<City/>);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});
	test('Cuisine instance page', () => {
		const component = shallow(<Cuisine/>);
		expect(component).toMatchSnapshot();
		expect(component).not.toBeUndefined;
		expect(component).toHaveLength(1);
	});


})

