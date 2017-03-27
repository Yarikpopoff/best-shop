import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import ProductsStore from './stores/ProductsStore';
import Constants from './constants/Constants';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberProductsInCart: ProductsStore.numberProductsInCart,
        }
    }

    componentWillMount() {
        ProductsStore.on(Constants.EVENT_CHENGE_NUMBER_PRODUCTS_IN_CART, this.getNumberProductsInCart); 
    }

    componentWillUnmount() {
        ProductsStore.removeListener(Constants.EVENT_CHENGE_NUMBER_PRODUCTS_IN_CART, this.getNumberProductsInCart);
    }

    getNumberProductsInCart = () => {
        this.setState({numberProductsInCart: ProductsStore.numberProductsInCart});
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/main'>
                                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
                            </Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href='#/products'>Products list</NavItem>
                        <NavItem eventKey={2} href='#/admin'>Admin</NavItem>
                        <NavItem eventKey={3} href='#/cart'>
                            <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">{this.state.numberProductsInCart}</span>
                        </NavItem>
                    </Nav>
                </Navbar>

                <div>
                    {this.props.children}
                </div>

            </div>
        )
    }
}