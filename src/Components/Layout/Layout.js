import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../Hoc/AuxComp';
import classes from '../../css/Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer : false });

    }
    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer : true });

    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth= {this.props.isAuthenticated} open = {this.sideDrawerOpenHandler}/>
                <SideDrawer isAuth= {this.props.isAuthenticated} open = {this.state.showSideDrawer} closed ={this.sideDrawerCloseHandler}/>
                <main className= {classes.Content} >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
};

const mapStateToProps = state => {

    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);