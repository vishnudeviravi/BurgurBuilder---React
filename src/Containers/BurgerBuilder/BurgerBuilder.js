import React, { Component } from 'react';
import Aux from '../../Hoc/AuxComp';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import { INGREDIENTS_PRICE } from './Constants';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading:false,
        error:false
    }

    componentDidMount () {

        axios.get('https://react-my-burger-18451.firebaseio.com/ingredients.json')
             .then(response => {
                    this.setState({ingredients: response.data});
             })
             .catch(error =>this.setState({error:true}))
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum,el)=> sum+el,0);
        this.setState({ purchasable: sum > 0 })


    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ingredientPrice;
        this.setState({ totalPrice:newPrice, ingredients:updatedIngredients });
        this.updatePurchaseState(updatedIngredients);



    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0 ) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - ingredientPrice;
        this.setState({ totalPrice:newPrice, ingredients:updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false})
    }

    purchaseContineHandler = () => {

        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }  
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search : `?${queryString}`

        });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error?   <p> Ingredients cant be loaded</p>:<Spinner/>
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = { this.state.ingredients } />
                    <BuildControls 
                            addIngredientHandler = {this.addIngredientHandler} 
                            removeIngredientHandler = {this.removeIngredientHandler} 
                            disabledInfo = {disabledInfo}
                            price = {this.state.totalPrice}
                            purchasable = {this.state.purchasable}
                            ordered = {this.purchaseHandler}
                            />
                </Aux>
            )
            orderSummary = <OrderSummary ingredients = {this.state.ingredients } 
                            price = {this.state.totalPrice}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContineHandler}/>; 
        }
        if (this.state.loading) orderSummary = <Spinner/>
        

        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed = {this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

export default  withErrorHandler(BurgerBuilder, axios);