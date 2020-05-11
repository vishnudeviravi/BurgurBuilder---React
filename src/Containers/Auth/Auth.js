import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import { auth, setAuthRedirectPath } from '../../Store/actions/index';
 

import classes from '../../css/Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid:false,
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid:false,
                touched:false
            } 
        },
        isSignUp : true
    }
    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirectPath !=='/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    checkValidity =(value, rules) => {
        let isValid = false;
        if(rules.required) {
            isValid = value.trim() !== '' ;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid ;
        }
        if(rules.isEmail) {
            isValid = isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        let updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})

    }
    submitHandler = (event) => {
        const { controls } = this.state;
        event.preventDefault();
        this.props.onAuth(controls.email.value,controls.password.value,this.state.isSignUp );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp:!prevState.isSignUp}
        })
    }


    render () {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push ({
                    id:key,
                    config:this.state.controls[key]
            })  
        }
        let form = formElementArray.map(element => (
            <Input
                key = {element.id}
                elementType = {element.config.elementType}
                elementConfig = {element.config.elementConfig}
                value = {element.config.value}
                invalid = {!element.config.valid}
                shouldValidate = {element.config.validation}
                touched = {element.config.touched}
                changed = {(e) => this.inputChangedHandler(e,element.id)}/>
           
        ))
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to ={this.props.authRedirectPath}/>
        }
        return (
            <div className = {classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType = "Success">SUMBIT</Button>
                </form>
                <Button 
                clicked = {this.switchAuthModeHandler}
                btnType = "Danger">SWITCH TO : {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP' }</Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error ,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath   
    }
}

const mapDispatchToProps = dispatch => {
    return {    
        onAuth : (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: ()=> dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);