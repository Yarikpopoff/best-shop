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
        this.setState({products: ProductsStore.products});
    }

    handleDelProduct(id) {
        let result = confirm(`Удалять запись ${id}?`);
        if (result) {
            productAction.deleteProduct(id);
            productAction.getProduct();
            this.setState({products: ProductsStore.products});
        }
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
                                <Button href={'#/admin/edit/' + el.id}>Edit</Button>
                                <Button onClick={this.handleDelProduct.bind(this,el.id)}>Delete</Button>
                            </ButtonToolbar>
                        </ListGroupItem>
                    )
                })}
                </ListGroup>
            </div>
        )
    }
}