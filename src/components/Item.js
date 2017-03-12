import React from 'react';
import { Panel } from 'react-bootstrap';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Panel>This is the Item page of our online shop!</Panel>                
            </div>
        )
    }
}