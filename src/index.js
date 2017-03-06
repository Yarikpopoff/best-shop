import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import App from './App.js';
import Main from './components/Main.js';
import Products from './components/Products.js';
import Admin from './components/Admin.js';
import Cart from './components/Cart.js';
import Item from './components/Item.js';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRedirect to='/main' />
            <Route path='/main' component={Main} />
            <Route path='/products' component={Products}>
                <Route path='/products/item/:id' component={Item} />
            </Route>
            <Route path='/admin' component={Admin} />
            <Route path='/cart' component={Cart} />
        </Route>
    </Router>, 
    document.getElementById('mount-point')
);