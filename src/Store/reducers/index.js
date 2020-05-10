import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
     burgerBuilder: burgerBuilderReducer,
     order: orderReducer
})

export default rootReducer;