import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'
import React from 'react';
configure({ adapter: new Adapter() })
describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('should render two <NaviagtionItems /> elements if not authenticated', () => {

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NaviagtionItems /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render  exact Logout', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem navLink="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
