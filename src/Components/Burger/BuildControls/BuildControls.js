import React from 'react';
import classes from '../../../css/BuildControls.module.css';
import { CONTROLS }  from './Constants';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = CONTROLS.map(ctrl => <BuildControl
                                             key = {ctrl.label}
                                             label= {ctrl.label}
                                             add = {()=>props.addIngredientHandler(ctrl.type)}
                                             remove = {()=>props.removeIngredientHandler(ctrl.type)}
                                             disabledInfo ={props.disabledInfo[ctrl.type]}
                                             />)
                                             
    return (
        <div className = {classes.BuildControls}>
            <p>Th total price is : <strong>$ {props.price.toFixed(2)}</strong> </p>
            {controls}
            <button className={classes.OrderButton}
                    disabled = {!props.purchasable}
                    onClick = {props.ordered}>ORDER NOW! </button>
        </div>

    )
}

export default buildControls;