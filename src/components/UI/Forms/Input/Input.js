import React from 'react';
import './Input.css';
const input = (props) => {
    let inputElement = null, validationError = null;
    const inputClasses = ["InputElement"];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
        validationError = <p className="InvalidError">Please enter valid value !</p>
    }
    switch (props.elementType) {

        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    return (
                        <option key={option.value}
                            value={option.value}
                        >{option.displayName}</option>
                    )
                })}
            </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
    }
    return (
        <div className="Input">
            <label className="Label" >{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;