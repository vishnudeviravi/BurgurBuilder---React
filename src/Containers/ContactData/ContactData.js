import React , { Component }  from 'react';
import Button from '../../UI/Button/Button';
import classes from '../../css/ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';


class ContactData extends Component {

    state = {
        name : '',
        email: '',
        address: {
            street: '',
            pincode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price : this.props.price,
            customer : {
                name : "Sachin sewagr",
                address: {
                    street: "ablikeraa",
                    pincode: 859302,
                    country:'India'
                },
                email: 'sachin@test.com'
            },
            deliveryMethod: 'fastest'
        }
        console.log('hellos')
        axios.post('/orders.json', order)
             .then(response=> 
                this.setState({loading:false}))
            .then(this.props.history.push('/'))
             .catch(error=> 
                this.setState({loading:false}));

        
    }

    render () {
        let form = (
            <form>
                    <input className = {classes.Input} type='text' name ='name' placeholder='Your Name'/>
                    <input className = {classes.Input} type='email' name ='email' placeholder='Your Email'/>
                    <input className = {classes.Input} type='text' name ='street' placeholder='Street'/>
                    <input className = {classes.Input} type='text' name ='pincode' placeholder='Pincode'/>
                    <Button btnType = 'Success' clicked= {this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) form = <Spinner/>

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
} 

export default ContactData;