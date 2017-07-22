import React from 'react';
import { Panel } from 'react-bootstrap';
import {axiosSetDefault} from '../utils';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        axiosSetDefault();
    }

    render() {
        return (
            <div>
                <Panel>This is the Main page of our online shop!</Panel>
            </div>
        )
    }
}