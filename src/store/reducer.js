import * as  actionTypes from './actions';

const INGREDIENT_PRICE = {
    salad: 0.20,
    bacon: 0.30,
    cheese: 0.10,
    meat: 0.50
}

const intialState = {
    ingredients : {
       salad: 0,
       bacon: 0,
       cheese: 0,
       meat: 0
    },
    totalPrice : 4
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
        default:
            return state;
    }
}

export default reducer;