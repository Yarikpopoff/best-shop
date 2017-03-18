import React from 'react';
import { Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import * as productAction from '../actions/productAction';

export default class Add extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            price: "", 
            img_name:"", 
            description :""
        }       
    }

    handleAddProduct = (e) => {
        e.preventDefault();
        productAction.createProduct(this.state);
        this.props.router.push('/admin'); // переход на admin
    }

    handleAddName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleAddPrice = (e) => {
        this.setState({ price: e.target.value });
    }

    handleAddFile = (e) => {
        this.setState({ img_name: e.target.value });
    }

    handleAddDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    render() {
        return (
            <div>
                <Panel>
                <p>Add a new product</p>
                <form onSubmit={this.handleAddProduct}>
                    <FormGroup controlId="formName">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Enter name"
                            onChange={this.handleAddName}
                        />
                    </FormGroup>
                    <FormGroup controlId="formPrice">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.price}
                            placeholder="Enter price"
                            onChange={this.handleAddPrice}
                        />
                    </FormGroup>
                    <FormGroup controlId="formFile">
                        <ControlLabel>Img</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.img_name}
                            onChange={this.handleAddFile}
                        />
                    </FormGroup>
                    <FormGroup controlId="formDescription">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.description}
                            placeholder="Enter description"
                            onChange={this.handleAddDescription}
                        />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </form>
                </Panel>
            </div>
        )
    }
}