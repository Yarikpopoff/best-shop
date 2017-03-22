import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

class ProductsStore extends EventEmitter {
    constructor() {
        super();
        this.products = []; // промежуточное хранение списка продуктов
        Dispatcher.register( action => {
            switch (action.type) {
                case Constants.GET_LIST_PRODUCTS:
                    this.products = action.products;
                    this.emit(Constants.EVENT_GET_LIST_PRODUCTS);
                    break;
            }
        })
    }
}

export default new ProductsStore();