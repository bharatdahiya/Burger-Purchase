import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.20,
    bacon: 0.30,
    cheese: 0.10,
    meat: 0.50
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        isPurchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-2c200.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            });
    }
    updatePurchaseState() {
        const ingredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, []);
        this.setState({ purchasable: sum > 0 })
    }

    isPurchasingHanlder = () => {
        this.setState({ isPurchasing: !this.state.isPurchasing });
    }

    purchaseCancelhandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {


        const queryParams = [];

        //Important part : How to pass value to other component using URL search Params 

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
       
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState();
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState();
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (<Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.isPurchasingHanlder} />
            </Auxiliary>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelhandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;

        }
        return (
            <Auxiliary>
                {<Modal show={this.state.isPurchasing}
                    modalClosed={this.purchaseCancelhandler}>
                    {orderSummary}
                </Modal>}
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);