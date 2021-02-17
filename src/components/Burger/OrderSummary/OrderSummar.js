import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

//this could be a functional component
class OrderSummary extends React.Component{

    // componentDidUpdate(){
    //     console.log('order summary will update')
    // }
    // shouldComponentUpdate(nextState){

    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(key =>{
            return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]} </li>
        })
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following Ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.totalPrice}</strong></p>
                <p>Continue to Checkout?</p>

                <Button btnType='Danger' clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continueOrder}>CONTINUE</Button>
            </Aux>
        )
    }
    
}

export default OrderSummary;