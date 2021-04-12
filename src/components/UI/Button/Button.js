import React from 'react';
import './Button.css'

const button = (props) => {
    let cssClass = ['Button'];
    if (props.btnType == "Success") {
        cssClass.push('Success');
    }
    else {
        cssClass.push('Danger');
    }
    let css = cssClass.join(' ');
    
    return (
        <button className={css} onClick={props.clicked} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default button;