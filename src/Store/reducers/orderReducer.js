import {PURCHASE_BURGER_FAILED, PURCHASE_BURGER_SUCCESS,
         PURCHASE_BURGER_START, PURCHASE_INIT,
        FETCH_ORDERS_START, FETCH_ORDERS_FAILED,
        FETCH_ORDERS_SUCCESS } from '../Constants';

const initialState = {
    orders:[],
    loading: false,
    purchased: false
};

const reducer = (state = initialState,action) => {

    switch (action.type) {

        case PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }

        case PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            console.log('hey')
            return {
                ...state,
                loading:false,
                purchased:true,
                orders: [...state.orders, action.newOrder]
            }
        case PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading:false
            }
        case PURCHASE_INIT:
            return {
                ...state,
                purchased:false
            }
        case FETCH_ORDERS_START:

            return {
                ...state,
                loading:true
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading:false
            }
            case FETCH_ORDERS_FAILED:
                return {
                    ...state,
                    loading:false
                }
        default:
            return state;
    }

};

export default reducer;