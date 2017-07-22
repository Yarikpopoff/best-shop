import React from 'react';
import {Panel, ListGroup, ListGroupItem, Media, ButtonToolbar, Button, Modal} from 'react-bootstrap';

import ProductsStore from '../stores/ProductsStore';
import Constants from '../constants/Constants';
import * as productAction from '../actions/productAction';
import {axiosSetDefault, load} from '../utils';
const host = load("HOST-KEY");

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        axiosSetDefault();
        this.state = {
            products: [],
            showModal: false,
            productWantToDel: {},
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

    handleDelProduct(product) {
        // let result = confirm(`Remove the product ${id}?`);
        // if (result) {
        //     productAction.deleteProduct(id);
        //     this.setState({products: ProductsStore.products});
        // }
        this.setState({showModal: true, productWantToDel: product});
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    openModal = () => {
        this.setState({showModal: true});
    }

    confirmDel = () => {
        productAction.deleteProduct(this.state.productWantToDel.id);
        this.setState({products: ProductsStore.products});
        this.setState({showModal: false});
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
                    {this.state.products.map((el, i) => {
                        return (
                            <ListGroupItem key={ i }>
                                <Media>
                                    <Media.Left>
                                        <img width={64} height={64} alt={el.img_name}
                                             src={"http://" + host + "/image/products/" + el.img_name}/>
                                    </Media.Left>
                                    <Media.Body>
                                        <Media.Heading>Name: {el.name}</Media.Heading>
                                        <p>Price: {el.price}</p>
                                        <p>Description: {el.description}</p>
                                    </Media.Body>
                                </Media>
                                <ButtonToolbar>
                                    <Button href={'#/admin/edit/' + el.id}>Edit</Button>
                                    <Button onClick={this.handleDelProduct.bind(this, el)}>Delete</Button>
                                </ButtonToolbar>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove the product?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Name: {this.state.productWantToDel.name}</p>
                        <p>Price: {this.state.productWantToDel.price}</p>
                        <p>Img_name: {this.state.productWantToDel.img_name}</p>
                        <p>Description: {this.state.productWantToDel.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button onClick={this.confirmDel}>Ok</Button>
                            <Button onClick={this.closeModal}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}