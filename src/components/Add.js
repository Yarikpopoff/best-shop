import React from 'react';
import { Panel, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
import * as productAction from '../actions/productAction';

export default class Add extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            price: "", 
            img_name:"", 
            description :"",
            file: undefined,
            filetype: undefined,
        }
    }

    handleAddProduct = (e) => {
        e.preventDefault();
        productAction.createProduct(this.state);
        this.props.router.push('/admin'); // переход на admin
    }

    handleAddCancel = () => {
        this.props.router.push('/admin');
    }

    handleAddName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleAddPrice = (e) => {
        this.setState({ price: e.target.value });
    }

    handleAddFile = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = (upload) => {
            console.log(reader.result);
            console.log(reader.result.substring(0,22));
            console.log(reader.result.substring(22));
            const stringB64 = reader.result.substring(22);
            this.setState({
                file: stringB64,
                img_name: file.name,
                filetype: reader.result.substring(0,22)
            }, ()=>{console.log(`end`)});
        };

        if (file) {
            reader.readAsDataURL(file);
        }
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
                            type="file"
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
                    <ButtonToolbar>
                        <Button type="submit">Submit</Button>
                        <Button onClick={this.handleAddCancel}>Canсel</Button>
                    </ButtonToolbar>
                </form>
                </Panel>
            </div>
        )
    }
}