import * as  actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
    salad: 0.20,
    bacon: 0.30,
    cheese: 0.10,
    meat: 0.50
}

const intialState = {
    ingredients : null,
    totalPrice : 4,
    error: false
};

const reducer = (state = intialState, action ) => {
    switch(action.type){

        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]+ 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]- 1
                },
                
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };

        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
}

export default reducer;