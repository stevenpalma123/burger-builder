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

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            ingredients: null,
            purchasable: false,
            totalPrice: 4,
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

            this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1; 
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        } else {
           const updatedCount = oldCount - 1; 
            const updatedIngredients = {
                ...this.state.ingredients
            };

            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;

            this.setState({totalPrice: newPrice, ingredients: updatedIngredients}); 
            this.updatePurchasable(updatedIngredients);
        }
        
    }

    purchaseContinueHandler = () => {
        // console.log('purchaseContinueHandler');
        // this.purchaseCancelHandler();
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
         this.props.history.push({
             pathname: '/checkout',
             search: `?${queryString}`
         });
     
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
                        purchasable={this.state.purchasable}
                        purchasing={this.state.purchasing}
                        purchase={this.purchaseHandler}
                        price={(this.state.totalPrice).toFixed(2)}/>
                </Aux> );

            orderSummary = (<OrderSummary 
                ingredients={this.props.ingredients}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContinueHandler}
                totalPrice={(this.state.totalPrice).toFixed(2)}/>)
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