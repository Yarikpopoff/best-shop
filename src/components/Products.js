import React from 'react';
import { Panel, ListGroup, ListGroupItem, Media, ButtonToolbar, Button } from 'react-bootstrap';

import ProductsStore from '../stores/ProductsStore';
import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import * as productAction from '../actions/productAction';
const host = "http://127.0.0.1:8084";

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productsInList: [], // add {inCart: false, numberInCart: 0} into each products
            productsInCartList: [], // [{id: 1, number:1}, {id: 2, number:1}, {id: 2, number:2}, ...]
            numberInCart: 0,
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
        let temp = this.state.productsInList;
        temp.forEach((el) => {
            if (el.inCart == true) {
                this.state.productsInCartList.push({id: el.id, number: el.numberInCart});
            }
        });
        ProductsStore.productsInCartList = this.state.productsInCartList;

        // отписываемся от события
        ProductsStore.removeListener(Constants.EVENT_GET_LIST_PRODUCTS, this.getProductsList); 
    }

    componentWillUpdate() {
        // console.log('Update');
    }

    getProductsList = () => {
        let tempArr = ProductsStore.products;
        let tempCart = ProductsStore.productsInCartList;
        tempArr.forEach((el) => {
            el.inCart = false;
            el.numberInCart = 0;
            tempCart.forEach((el1) => {
                if (el.id == el1.id) {
                    el.inCart = true;
                    el.numberInCart = el1.number;
                }
            })
        });
        this.setState({products: ProductsStore.products, productsInList: tempArr, numberInCart: ProductsStore.numberProductsInCart});
    }

    addProductsToCart = () => {
        this.setState({products: ProductsStore.productsInCartList});
    }

    handleAddToCart(id) {
        let temp = this.state.productsInList;
        temp.forEach((el) => {
            if (el.id == id) {
                el.inCart = true;
                el.numberInCart += 1;
                this.setState({productsInList: temp, numberInCart: this.state.numberInCart += 1});
            }
        });
        Dispatcher.dispatch({
            type: Constants.CHENGE_NUMBER_PRODUCTS_IN_CART,
            numberProductsInCart: this.state.numberInCart
        });
    }

    handleDeleteFromCart(id) {
        let temp = this.state.productsInList;
        temp.forEach((el) => {
            if (el.id == id) {
                if (el.numberInCart == 1) {
                    el.inCart = false;
                    el.numberInCart -= 1;
                } else {
                    el.numberInCart -= 1;
                }
                this.setState({productsInList: temp, numberInCart: this.state.numberInCart -= 1});
            }
        });
        Dispatcher.dispatch({
            type: Constants.CHENGE_NUMBER_PRODUCTS_IN_CART,
            numberProductsInCart: this.state.numberInCart
        });
    }

    render() {
        return (
            <div>
                <Panel>Products</Panel>
                <ListGroup>
                {this.state.productsInList.map((el, i)=>{
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
                                <Button onClick={this.handleDeleteFromCart.bind(this, el.id)} disabled={!el.inCart}>Delete from cart</Button>
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