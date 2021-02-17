import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummar';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import instance from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';


class BurgerBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            purchasable: false,
            purchasing: false,
            loading: false
        }
    }

    componentDidMount = () => {
        // axios.get('ingredients.json')
        // .then(response=>{
        //     this.setState({ingredients: response.data})
        // })
        // .catch(err =>{
        //     console.log(err);
        // })
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchasable = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map( key =>{
                return ingredients[key];
            }).reduce((sum, el)=>{
                return sum + el;
            }, 0)

            return  sum > 0;
    }

    

    purchaseContinueHandler = () => {
         this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p> Ingredients Can't be loaded</p> : <Spinner />;

        if(this.props.ingredients){
             burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                        purchasing={this.state.purchasing}
                        purchase={this.purchaseHandler}
                        price={(this.props.totalPrice).toFixed(2)}/>
                </Aux> );

            orderSummary = (<OrderSummary 
                ingredients={this.props.ingredients}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContinueHandler}
                totalPrice={(this.props.totalPrice).toFixed(2)}/>)
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }
       
        

        return(
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                       {orderSummary} 
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        ingredients : state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onIngredientAdded: (ingredientName) => dispatch({type: actionType.ADD_INGREDIENTS, key: ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionType.REMOVE_INGREDIENTS, key: ingredientName })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));