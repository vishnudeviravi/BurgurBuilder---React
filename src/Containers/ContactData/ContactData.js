import React , { Component }  from 'react';
import Button from '../../UI/Button/Button';
import classes from '../../css/ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

class ContactData extends Component {
t
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            pincode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'pincode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:4,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options : [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid:false
               
            }
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const { orderForm } = this.state;
        const formData = {};
        for (let formKey in orderForm) {
            formData[formKey] = orderForm[formKey].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            orderData : formData,
            price : this.props.price
            
        }
        axios.post('/orders.json', order)
             .then(response=> 
                this.setState({loading:false}))
            .then(this.props.history.push('/'))
             .catch(error=> 
                this.setState({loading:false}));

        
    }

    checkValidity(value, rules) {
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '' ;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid ;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid ;
        } 
        console.log(isValid)
        return isValid;
    }

    inputChangedHandler = (event,inputIndentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement =  {
            ...updatedOrderForm[inputIndentifier]
        }
        updatedFormElement.value = event.target.value;
        console.log(updatedFormElement.validation)
        updatedFormElement.valid = 
        this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched  = true;
        updatedOrderForm[inputIndentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm});
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push ({
                    id:key,
                    config:this.state.orderForm[key]
            })  
        }
        const formElement = formElementArray.map(element => (
            <Input  key = {element.id}
                    elementType = {element.config.elementType}
                   elementConfig = {element.config.elementConfig}
                    value = {element.config.value}
                    invalid = {!element.config.valid}
                    shouldValidate = {element.config.validation}
                    touched = {element.config.touched}
                    changed = {(e) => this.inputChangedHandler(e,element.id)}/>
        ))
        let form = (
            <form onSubmit = {this.orderHandler}>
                    {formElement}
                    <Button btnType = 'Success'>ORDER</Button>
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