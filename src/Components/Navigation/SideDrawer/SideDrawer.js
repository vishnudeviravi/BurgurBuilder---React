import React from 'react';
import classes from '../../../css/SideDrawer.module.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../../UI/BackDrop/BackDrop';
import Aux from '../../../Hoc/AuxComp';

const sideDrawer = (props) => {

    let attachedClass = [classes.SideDrawer, classes.Close];
    if (props.open) attachedClass = [classes.SideDrawer, classes.Open];

    return (
        <Aux>
            <BackDrop show ={props.open} clicked = {props.closed}/>
            <div className = {attachedClass.join(' ')}>
                <div className={classes.Logo}>
                <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated= {props.isAuth}/>
                </nav>
            </div>
        </Aux>

    )


}

export default sideDrawer;