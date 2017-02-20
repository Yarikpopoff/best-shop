import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Link to='/main'>Main</Link>
                    </div>
                    <div>
                        <Link to='/productslist'>Products list</Link>
                    </div>
                    <div>
                        <Link to='/cart'>Cart</Link>
                    </div>
                </div>

                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}