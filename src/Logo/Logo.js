import React from 'react';
import burgerLogo from '../assets/images/logo.png';
import classes from '../css/Logo.module.css';
const logo = () => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt ="logo"/>
    </div>

);

export default logo;