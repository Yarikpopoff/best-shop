import React from 'react';
import { Panel, Media } from 'react-bootstrap';
import ProductsStore from '../stores/ProductsStore';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        let [item] = ProductsStore.products.filter((el) => el.id == props.params.id);
        this.state = {
            products: item
        }
    }

    render() {
        return (
            <div>
                <Panel>
                    <div>
                        <p>This is the Item page of our online shop!</p>
                        <p>id: {this.props.params.id}</p>
                    </div>
                    <Media>
                        <Media.Left>
                            <img width={64} height={64} src="" alt={this.state.products.img_name}/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>Name: {this.state.products.name}</Media.Heading>
                            <p>Price: {this.state.products.price}</p>
                            <p>Description: {this.state.products.description}</p>
                        </Media.Body>
                    </Media>
                </Panel>
            </div>
        )
    }
}