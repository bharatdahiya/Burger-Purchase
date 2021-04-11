import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems =(props) => (
    <ul className="NavigationItems">
       <NavigationItem navLink="/" exact>Burger Builder</NavigationItem>
       {props.isAuthenticated ? <NavigationItem navLink="/orders" >Orders</NavigationItem> : null}
       {!props.isAuthenticated ?  <NavigationItem navLink="/auth" >Login</NavigationItem> : <NavigationItem navLink="/logout" >Logout</NavigationItem>}
    </ul>
);

export default navigationItems;