import React from 'react';
import { Panel, ListGroup, ListGroupItem, Media, ButtonToolbar, Button, Checkbox } from 'react-bootstrap';

import ProductsStore from '../stores/ProductsStore';
import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import * as productAction from '../actions/productAction';
const host = "http://127.0.0.1:8084";

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [], // add {numberInCart: 0} into each products
            productsInCartList: [], // [{id: 1, number:1}, {id: 2, number:1}, {id: 2, number:2}, ...]
            numberInCart: 0,
            inCart: false,
        }        
    }
   
    componentDidMount() {
        productAction.getProduct();
    }
    
    componentWillMount() {
        // подписываемся на событие диспатчера
        ProductsStore.on(Constants.EVENT_GET_LIST_PRODUCTS, this.getProductsList); 
    }

    componentWillUnmount() {
        this.state.products.forEach((el) => {
            if (el.numberInCart > 0) {
                this.state.productsInCartList.push({id: el.id, number: el.numberInCart});
            }
        });
        
        ProductsStore.productsInCartList = this.state.productsInCartList;
        // Dispatcher.dispatch({
            // type: Constants.SEND_CART_STATUS,
            // productsInCartList: this.state.productsInCartList
        // });

        // отписываемся от события
        ProductsStore.removeListener(Constants.EVENT_GET_LIST_PRODUCTS, this.getProductsList); 
    }

    getProductsList = () => {
        ProductsStore.products.forEach((el) => {
            el.numberInCart = 0;
            ProductsStore.productsInCartList.forEach((el1) => {
                if (el.id == el1.id) {
                    el.numberInCart = el1.number;
                }
            })
        });
        this.setState({products: ProductsStore.products, numberInCart: ProductsStore.numberProductsInCart});
    }

    handleAddToCart(id) {
        this.state.products.forEach((el) => {
            if (el.id == id) {
                el.numberInCart += 1;
                this.setState({productsInList: this.state.products, numberInCart: this.state.numberInCart += 1});
            }
        });
        Dispatcher.dispatch({
            type: Constants.CHENGE_NUMBER_PRODUCTS_IN_CART,
            numberProductsInCart: this.state.numberInCart
        });
    }

    handleDeleteFromCart(id) {
        this.state.products.forEach((el) => {
            if (el.id == id) {
                el.numberInCart -= 1;
                this.setState({productsInList: this.state.products, numberInCart: this.state.numberInCart -= 1});
            }
        });
        Dispatcher.dispatch({
            type: Constants.CHENGE_NUMBER_PRODUCTS_IN_CART,
            numberProductsInCart: this.state.numberInCart
        });
    }

    handleAddFilter = (e) => {
        this.setState({inCart: e.target.checked});
    }

    render() {
        return (
            <div>
                <Panel>Products
                    <Checkbox onChange={this.handleAddFilter}>in cart</Checkbox>
                </Panel>
                <ListGroup>
                {this.state.products
                    .filter(el => !this.state.inCart || el.numberInCart > 0)
                    .map((el, i)=>{
                        return (
                            <ListGroupItem key={ i }>
                                <Media>
                                    <Media.Left>
                                        <img width={64} height={64} alt={el.img_name}
                                         src={host+"/image/products/"+el.img_name} />
                                    </Media.Left>
                                    <Media.Body>
                                        <Media.Heading>Name: {el.name}</Media.Heading>
                                        <p>Price: {el.price}</p>
                                        <p>Description: {el.description}</p>
                                    </Media.Body>
                                </Media>
                                <ButtonToolbar>
                                    <Button href={'#/products/view/' + el.id}>View</Button>
                                    <Button onClick={this.handleAddToCart.bind(this, el.id)}>Add to cart</Button>
                                    <Button onClick={this.handleDeleteFromCart.bind(this, el.id)} disabled={!el.numberInCart}>Delete from cart</Button>
                                    <Button href='#/cart'><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">{el.numberInCart}</span></Button>
                                </ButtonToolbar>
                            </ListGroupItem>
                        )                    
                })}
                </ListGroup>
            </div>
        )
    }
}