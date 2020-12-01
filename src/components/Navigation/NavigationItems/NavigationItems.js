import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems =(props) => (
    <ul className="NavigationItems">
       <NavigationItem navLink="/" exact>Burger Builder</NavigationItem>
       <NavigationItem navLink="/orders" >Orders</NavigationItem>
    </ul>
);

export default navigationItems;