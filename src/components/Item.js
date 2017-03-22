import React from 'react';
import { Panel, Media, ButtonToolbar, Button } from 'react-bootstrap';
import ProductsStore from '../stores/ProductsStore';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        let [item={}] = ProductsStore.products.filter((el) => el.id == props.params.id);
        this.state = {
            products: item
        }
    }

    handleOk = () => {
        this.props.router.push('/products')
    }

    render() {
        return (
            <div>
                <Panel>
                    <div>
                        <p>Product preview</p>
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
                        <ButtonToolbar>
                            <Button onClick={this.handleOk}>Ok</Button>
                        </ButtonToolbar>
                    </Media>
                </Panel>
            </div>
        )
    }
}