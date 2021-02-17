import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

    return (
        <React.Fragment>
            <div className={classes.CheckoutSummary}>
                <h1>We hope it taste well!</h1>
                <div style={{margin: 'auto'}} >
                    <Burger ingredients={props.ingredients}/>
                    <Button btnType='Danger' clicked={props.checkoutCancelled}> Cancel </Button>
                    <Button btnType='Success' clicked={props.checkoutContinued}> Continue </Button>
                </div>
            </div>
        </React.Fragment>
       
    )

}

export default checkoutSummary;