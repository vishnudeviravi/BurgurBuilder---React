import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Route ,Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import {authCheckState} from './Store/actions'



class App extends Component {


    componentDidMount () {
        this.props.onTryAutoSignup();
    }
    render() {
        let routes =  (
            <Switch>
            <Route path = '/auth' exact component={Auth}/>
            <Route path = '/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path = '/checkout' component={Checkout}/>
                    <Route path = '/orders' exact component={Orders}/> 
                    <Route path = '/logout' exact component={Logout}/>     
                    <Route path = '/' exact component={BurgerBuilder}/>
                </Switch>
            ); 
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated : () => state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup : () => dispatch(authCheckState())
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));