import React from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import { Route } from 'react-router-dom';
import UserData from '../UserData/UserData';
export default class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalprice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === "price") {
                price = param[1];
            } else {
                ingredients[param[0]] = + param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalprice: price });
    }

    oncheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    oncheckoutContinueHandler = () => {
        this.props.history.push('/checkout/user');
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    oncheckoutCancelled={this.oncheckoutCancelledHandler}
                    oncheckoutContinue={this.oncheckoutContinueHandler} />
                <Route path={this.props.match.path + '/user'}
                    render={(props) => (<UserData ingredients={this.state.ingredients} price={this.state.totalprice} { ...props}/>)} />
            </div>
        );

    }
}