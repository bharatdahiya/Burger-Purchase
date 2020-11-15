import React from 'react';
import './NavigationItem.css';
const navigationItem = (props) => {
      return (<li className="NavigationItem">
        <a
            href={props.navLink}
            className={props.active ? 'active' : null}>
            {props.children}
        </a>
    </li>);
};

export default navigationItem;