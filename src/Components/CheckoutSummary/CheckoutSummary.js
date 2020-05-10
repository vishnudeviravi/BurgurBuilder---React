import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from '../../css/CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    if (props.ingredients) {
    return (
        <div className = { classes.CheckoutSummary }> 
            <h1> Hope it taste well!</h1>
            <div style = {{width:'100%',margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button clicked={props.onCheckoutCancelled} btnType = "Danger">CANCEL</Button>
            <Button clicked={props.onCheckoutContinued} btnType = "Success">CONTINUE</Button>
        </div>
    )
    }
    return null;

}

export default checkoutSummary;