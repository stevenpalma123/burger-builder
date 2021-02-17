import React from 'react';
import Order from './Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends React.Component {
    state = { 
        orders: [],
        loading: true
     }

    componentDidMount = () => {
        axios.get('/order.json')
        .then(response =>{
            console.log(response.data);
            const fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({...response.data[key], id: key})
            }
            this.setState({loading: false, orders: fetchedOrders});
            
        })
        .catch(err => {
            this.setState({loading: false});
            
        })
    }

    render() { 
        return ( 
            <div>
                {this.state.orders.map(order =>{
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                })}
            </div>
            
         );
    }
}
 
export default withErrorHandler(Orders, axios);