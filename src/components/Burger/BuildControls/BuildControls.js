import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]



const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>$ {props.price}</strong></p>
        {
            controls.map((control) =>{
                return <BuildControl 
                            key={control.label} 
                            label={control.label} 
                            remove={() => props.ingredientRemove(control.type)} 
                            added={() => props.ingredientAdded(control.type)}
                            disabled={props.disabled[control.type]}/>
            })
        }
        <button disabled={!props.purchasable} onClick={props.purchase} className={classes.OrderButton} >ORDER NOW</button>
    </div>
);

export default buildControls;