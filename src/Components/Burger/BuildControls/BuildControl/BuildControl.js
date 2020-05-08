import React from 'react';
import classes from '../../../../css/BuildControl.module.css';

const buildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less}
                    onClick = {props.remove}
                    disabled = {props.disabledInfo}>Less</button>
            <button className={classes.More} onClick = {props.add}>More</button>
        </div>
    )
}

export default buildControl;