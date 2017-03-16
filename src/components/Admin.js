import React from 'react';
import { Panel, ListGroup, ListGroupItem, Media, ButtonToolbar, Button } from 'react-bootstrap';

import ProductsStore from '../stores/ProductsStore';
import Constants from '../constants/Constants';
import * as productAction from '../actions/productAction';

export default class Admin extends React.Component {
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

    handleAddProduct() {
        console.log(`add`);
    }

    handleEditProduct(id) {
        console.log(`edit ${id}`);
    }

    handleDelProduct(id) {
        console.log(`delete ${id}`);
    }

    render() {
        return (
            <div>
                <Panel>Admin</Panel>
                <Panel>
                    <ButtonToolbar>
                        <Button href={'#/admin/add'}>Add new product</Button>
                    </ButtonToolbar>
                </Panel>
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
                                <Button onClick={this.handleEditProduct.bind(this, el.id)}>Edit</Button>
                                <Button onClick={this.handleDelProduct.bind(this, el.id)}>Delete</Button>
                            </ButtonToolbar>
                        </ListGroupItem>
                    )
                })}
                </ListGroup>
            </div>
        )
    }
}