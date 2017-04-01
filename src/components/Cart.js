import React from 'react';
import { Panel, ListGroup, ListGroupItem, Media, ButtonToolbar, Button } from 'react-bootstrap';
import * as cartAction from '../actions/cartAction';
import ProductsStore from '../stores/ProductsStore';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products:ProductsStore.products,
            productsInCartList: ProductsStore.productsInCartList,
        }
    }

    handlePostCart = () => {
        console.log('Post Cart!');
    }

    render() {
        return (
            <div>
                <Panel>
                    <p>This is the Cart page of our online shop!</p>
                    <ButtonToolbar>
                        <Button onClick={this.handlePostCart}>Сonfirm the order</Button>
                    </ButtonToolbar>
                </Panel>
                <ListGroup>
                {this.state.products.map((el, i) => {
                    if (el.numberInCart) {
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
                                        <p><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">{el.numberInCart}</span></p>
                                    </Media.Body>
                                </Media>
                            </ListGroupItem>
                        )
                    }
                })}
                </ListGroup>
            </div>
        )
    }
}