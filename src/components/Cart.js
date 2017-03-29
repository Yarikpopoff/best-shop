import React from 'react';
import { Panel } from 'react-bootstrap';
import * as cartAction from '../actions/cartAction';
import ProductsStore from '../stores/ProductsStore';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInCartList: ProductsStore.productsInCartList,
        }
    }

    render() {
        return (
            <div>
                <Panel>
                    This is the Cart page of our online shop!
                    {this.state.productsInCartList.map((el, i) => {
                        return (
                            <div key = { i }>
                                <p>id: {el.id}, number: {el.number}</p>                                
                            </div>
                        )
                    })}
                </Panel>                
            </div>
        )
    }
}