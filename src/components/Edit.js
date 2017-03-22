import React from 'react';
import { Panel, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
import ProductsStore from '../stores/ProductsStore';
import * as productAction from '../actions/productAction';



export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        [this.state] = ProductsStore.products.filter((el) => el.id == props.params.id);
    }

    handleProduct = (e) => {
        e.preventDefault();
        productAction.updateProduct(this.props.params.id, this.state);
        this.props.router.push('/admin'); // переход на admin
    }

    handleCancel = () => {
        this.props.router.push('/admin');
    }
    
    handleName = (e) => {
        this.setState({ name: e.target.value });
    }

    handlePrice = (e) => {
        this.setState({ price: e.target.value });
    }

    handleFile = (e) => {
        this.setState({ img_name: e.target.value });
    }

    handleDescription = (e) => {
        this.setState({ description: e.target.value })
    }    

    render() {
        return (
            <div>
                <Panel>
                    <p>Edit the product</p>
                    <p>id: {this.props.params.id}</p>
                    <form onSubmit={this.handleProduct}>
                        <FormGroup controlId="formName">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.name}
                                placeholder="Enter name"
                                onChange={this.handleName}
                            />
                        </FormGroup>
                        <FormGroup controlId="formPrice">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.price}
                                placeholder="Enter price"
                                onChange={this.handlePrice}
                            />
                        </FormGroup>
                        <FormGroup controlId="formFile">
                            <ControlLabel>Img</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.img_name}
                                onChange={this.handleFile}
                            />
                        </FormGroup>
                        <FormGroup controlId="formDescription">
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.description}
                                placeholder="Enter description"
                                onChange={this.handleDescription}
                            />
                        </FormGroup>
                        <ButtonToolbar>
                            <Button type="submit">Submit</Button>
                            <Button onClick={this.handleCancel}>Canсel</Button>
                        </ButtonToolbar>
                    </form>
                </Panel>
            </div>
        )
    }
}