import React from 'react';
import { Panel, ListGroup, ListGroupItem, Media, ButtonToolbar, Button } from 'react-bootstrap';

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

    handleViewProducts(id) {
        console.log(`view ${id}`);
    }

    handleAddToCart(id) {
        console.log(`add to cart ${id}`);
    }

    handleDeleteFromCart(id) {
        console.log(`delete from cart ${id}`);
    }

    render() {
        return (
            <div>
                <Panel>Products</Panel>
                <ListGroup>
                {this.state.products.map((el, i)=>{
                    return (
                        <ListGroupItem key={ i }>
                            <Media>
                                <Media.Left>
                                    <img width={64} height={64} src="" alt={el.img_name}/>
                                </Media.Left>
                                <Media.Body>
                                    <Media.Heading>Name: {el.name}</Media.Heading>
                                    <p>Price: {el.price}</p>
                                    <p>Description: {el.description}</p>
                                </Media.Body>
                            </Media>
                            <ButtonToolbar>
                                <Button onClick={this.handleViewProducts.bind(this, el.id)}>View details</Button>
                                <Button onClick={this.handleAddToCart.bind(this, el.id)}>Add to cart</Button>
                                <Button onClick={this.handleDeleteFromCart.bind(this, el.id)}>Delete from cart</Button>
                            </ButtonToolbar>
                        </ListGroupItem>
                    )
                })}
                </ListGroup>
            </div>
        )
    }
}