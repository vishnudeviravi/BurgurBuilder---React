import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
     burgerBuilder: burgerBuilderReducer,
     order: orderReducer,
     auth: authReducer
})

export default rootReducer;