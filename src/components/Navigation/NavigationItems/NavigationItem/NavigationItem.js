import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    return (
        <li className="NavigationItem">
            <NavLink to={props.navLink} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>);
};

export default navigationItem;