import * as actionTypes from './actionTypes';
import axios from '../../axios';

//Action Creators
export const purchaseBugerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBugerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseIntit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//Async actions using dispatch redux
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBugerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBugerFail(error));
            });
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                let fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                    console.log(key);
                }
                dispatch(fetchOrdersSuccess(fetchedData))
            }).catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }
}