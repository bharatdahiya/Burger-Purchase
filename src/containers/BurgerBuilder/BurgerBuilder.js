import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
        isPurchasing: false,
        loading: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-2c200.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     });
    }
    updatePurchaseState( ingredients ) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, []);
        return sum > 0;
    }

    isPurchasingHanlder = () => {
        this.setState({ isPurchasing: !this.state.isPurchasing });
    }

    purchaseCancelhandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");

        // const queryParams = [];

        // //Important part : How to pass value to other component using URL search Params 
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+ this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
       
    }


    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = <Spinner />;

        if (this.props.ings) {
            burger = (<Auxiliary>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemove={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.isPurchasingHanlder} />
            </Auxiliary>);

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelhandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />;

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

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));