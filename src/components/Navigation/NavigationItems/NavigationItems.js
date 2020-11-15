import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems =(props) => (
    <ul className="NavigationItems">
       <NavigationItem navLink="/" active>Burger Builder</NavigationItem>
       <NavigationItem navLink="/">CheckOut</NavigationItem>
    </ul>
);

export default navigationItems;