import React, {Component} from 'react';

import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {


    state = {
        ingredients : {
            salad:1
        },
        totalPrice:0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        let price;
        for (let param of query.entries()) {
            //['meat', 2]
            if (param[0] ==='price') {
                price = param[1];
            }
            else  ingredients[param[0]] = +param[1]
           
        }
        this.setState({ingredients:ingredients, totalPrice:price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.push('/')
    }
    checkoutContinuedHandler = ()=> {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
        
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                                 onCheckoutCancelled = {this.checkoutCancelledHandler}
                                 onCheckoutContinued = {this.checkoutContinuedHandler}/>
                <Route path={`${this.props.match.path}/contact-data`} 
                       render={(props)=>(<ContactData ingredients = {this.state.ingredients} price = {this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;