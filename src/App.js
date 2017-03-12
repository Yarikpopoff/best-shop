import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class App extends React.Component {
    constructor(props) {
        super(props);
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
                        <NavItem eventKey={3} href='#/cart'>Cart</NavItem>
                    </Nav>
                </Navbar>

                <div>
                    {this.props.children}
                </div>

            </div>
        )
    }
}