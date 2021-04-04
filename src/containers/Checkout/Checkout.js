import React from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import { Route } from 'react-router-dom';
import UserData from '../UserData/UserData';
import {connect} from 'react-redux';

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
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    oncheckoutCancelled={this.oncheckoutCancelledHandler}
                    oncheckoutContinue={this.oncheckoutContinueHandler} />
                <Route path={this.props.match.path + '/user'}
                   component={UserData}/>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);