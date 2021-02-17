import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import  { connect } from 'react-redux';
class ContactData extends React.Component {
    state = {
        orderForm: { 
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                }, 
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                }, 
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                }, 
                value: 'fastest', 
                valid: true
            }          
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients)
        this.setState({loading: true});
        const formData = {};
        for (let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };

        axios.post('order.json', order)
        .then(response => {
            console.log(response)
            this.setState({loading: false});
           this.props.history.push('/')
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false});
        });
    }

    checkValididty=(value, rules) => {
        let isValid = false;
        if(rules.required){
            isValid = value.trim() !== '';
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { 
            ...updatedOrderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = this.checkValididty(updatedElement.value, updatedElement.validation);

        updatedOrderForm[inputIdentifier] = updatedElement;
        console.log(updatedElement.valid, 'isValid')

        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm ){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form>
                    { formElementArray.map(formElement => {
                    return (<Input 
                        key={formElement.id} 
                        inValid={!formElement.config.valid}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        touched={formElement.config.touched}
                        shouldValidate = {formElement.config.validation}
                        change={(event)=>this.onChangeHandler(event, formElement.id)}/>);
                    })}
                    <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
                </form>);
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(ContactData));



