import React from 'react';
import { Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount = () => {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of queryParams.entries()){
            if(param[0] === 'price'){
                price = param[1];   
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        
        return (
            <div>
               
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler}/>
       
                <Route path={this.props.match.path + '/contact-data'} render={()=>(<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}/>)} />
            
            </div>
            
        );

    }
}
export default Checkout;