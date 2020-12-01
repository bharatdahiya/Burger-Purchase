import React from 'react';
import './Order.css'
const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span key={ig.name} 
                style={{textTransform:'capitalize', display: 'inline-block', margin: '0 8px', border:'1px solid #ccc', padding: '1px'}}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className="order">
            <p>Ingredients : {ingredientsOutput} </p>
            <p>Price: <strong> Rs. {Number.parseFloat(props.price).t} </strong></p>
        </div>
    );
};

export default order;