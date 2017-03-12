import React from 'react';
import { Panel } from 'react-bootstrap';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel>This is the Cart page of our online shop!</Panel>                
            </div>
        )
    }
}