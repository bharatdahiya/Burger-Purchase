import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
class Orders extends React.Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                let fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                    console.log(key);
                }
                this.setState({ loading: false, orders: fetchedData });
                console.log(res.data);
            }).catch(err => {
                this.setState({ loading: false });
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

export default Orders;