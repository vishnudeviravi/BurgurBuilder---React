import { ADD_INGREDIENT, REMOVE_INGREDIENT,
        SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from '../Constants';
import { INGREDIENTS_PRICE } from '../../Containers/BurgerBuilder/Constants';


const initialState = {
    ingredients : null,
    totalPrice : 4,
    error: false
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_INGREDIENT :
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]+1
                },
                totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]-1
                },
                totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error:false
            }
        case FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }

};

export default reducer;