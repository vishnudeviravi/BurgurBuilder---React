import React from 'react';
import classes from '../../../../css/DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className = {classes.DrawerToggle} onClick = {props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;