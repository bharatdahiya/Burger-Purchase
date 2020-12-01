import React from 'react';
import Burger from '../../Burger/Burger';
import Button  from '../../UI/Button/Button';
import './CheckoutSummary.css';
const checkoutSummary = (props) => {
    return (
        <div className="checkoutSummary">
            <h1>We hope it tastes well !</h1>
            <div style={{width:'100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.oncheckoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.oncheckoutContinue}>CONTINUE</Button>
            
        </div>
    );
}

export default checkoutSummary;