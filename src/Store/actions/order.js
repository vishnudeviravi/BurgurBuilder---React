import axios from '../../axios-orders';
import {PURCHASE_BURGER_FAILED, PURCHASE_BURGER_SUCCESS, 
        PURCHASE_BURGER_START, PURCHASE_INIT,
        FETCH_ORDERS_FAILED,
        FETCH_ORDERS_START,
        FETCH_ORDERS_SUCCESS } from '../Constants';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = () => {
    return {
        type: PURCHASE_BURGER_FAILED
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    
    return dispatch => {
        dispatch(purchaseInit());
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
             .then(response=>dispatch( purchaseBurgerSuccess(response.data.name, orderData)))
             .catch(error=> dispatch(purchaseBurgerFailed(error) ));
    }
}

export const purchaseInit = () => {
    return {
        type:PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
       
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: FETCH_ORDERS_FAILED,
        error:error
    }
}

export const fetchOrdersStart = () => {
    return {
        type:FETCH_ORDERS_START 
    }
}

export const fetchOrders = dispatch => {

    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
                
            })
    }

}