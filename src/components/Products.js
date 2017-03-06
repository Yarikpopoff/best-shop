import React from 'react';
import ProductsStore from '../stores/ProductsStore';
import Constants from '../constants/Constants';
import * as productAction from '../actions/productAction';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
        productAction.getProduct();
    }
   
   componentWillMount() {
       // подписываемся на событие диспатчера
       ProductsStore.on(Constants.EVENT_GET_LIST_PRODUCTS, this.getProductsList); 
   }

    componentWillUnmount() {
        // отписываемся от события
        ProductsStore.removeListener(Constants.EVENT_GET_LIST_PRODUCTS, this.getProductsList); 
    }

    getProductsList = () => {
        //const temp = ProductsStore.products;        
        // this.setState({products: temp});
        this.setState({products: ProductsStore.products});
    }

    render() {
        return (
            <div>
                Products
                {this.state.products.map((el, i)=>{
                    return (
                    <div key={i}>
                        <div>{el.id}</div>
                        <div>{el.name}</div>
                        <div>{el.price}</div>
                        <div>{el.img_name}</div>
                        <div>{el.description}</div>
                    </div>)
                })}
            </div>
        )
    }
}