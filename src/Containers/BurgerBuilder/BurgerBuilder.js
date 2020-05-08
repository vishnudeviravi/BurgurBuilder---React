import React, { Component } from 'react';
import Aux from '../../Hoc/AuxComp';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import { INGREDIENTS_PRICE } from './Constants';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon : 0,
            cheese:0,
            meat:0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
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
        alert('You Please Continue'); 
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed = {this.purchaseCancelHandler} >
                    <OrderSummary ingredients = {this.state.ingredients } 
                                  price = {this.state.totalPrice}
                                  purchaseCancelled = {this.purchaseCancelHandler}
                                  purchaseContinued = {this.purchaseContineHandler}/>
                </Modal>
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
    }
}

export default BurgerBuilder;