import React from 'react';
import { withRouter } from 'react-router-dom'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(key =>{
        return [...Array(props.ingredients[key])].map((_, i)=>{
            return <BurgerIngredient type={key} key={key + i}/>
        })
    }).flat();

    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p style={{color: "green"}}> Please Start Adding Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            { transformedIngredients }
            <BurgerIngredient type='bread-bottom'/>
            {/* <buildControls>

            </buildControls> */}
        </div>
    );
}

export default withRouter(burger);