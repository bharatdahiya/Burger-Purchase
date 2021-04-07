import React from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import UserData from '../UserData/UserData';
import { connect } from 'react-redux';

class Checkout extends React.Component {


    // //Without Redux
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === "price") {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = + param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalprice: price });
    // }

    oncheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    oncheckoutContinueHandler = () => {
        this.props.history.push('/checkout/user');
    }
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = <div>
                {purchaseRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                    oncheckoutCancelled={this.oncheckoutCancelledHandler}
                    oncheckoutContinue={this.oncheckoutContinueHandler} />
                <Route path={this.props.match.path + '/user'}
                    component={UserData} />
            </div>;
        }
        return summary;

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased : state.order.purchase
    }
}


export default connect(mapStateToProps)(Checkout);