import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

class ProductsStore extends EventEmitter {
    constructor() {
        super();
        this.products = []; // промежуточное хранение списка продуктов
        this.productsInCartList = []; // промежуточное хранение списка продуктов в корзине
        this.numberProductsInCart = 0; // количество продуктов в корзине
        this.productsInCart = [];
        Dispatcher.register( action => {
            switch (action.type) {
                case Constants.GET_LIST_PRODUCTS:
                    this.products = action.products;
                    this.emit(Constants.EVENT_GET_LIST_PRODUCTS);
                    break;
                case Constants.CHENGE_NUMBER_PRODUCTS_IN_CART:
                    this.numberProductsInCart = action.numberProductsInCart;
                    this.emit(Constants.EVENT_CHENGE_NUMBER_PRODUCTS_IN_CART);
                    break;
                // case Constants.SEND_CART_STATUS:
                    // this.productsInCartList = action.productsInCartList;
                    // this.emit(Constants.EVENP_SEND_CART_STATUS);
                    // break;
                case Constants.GET_PRODUCTS_FROM_CART:
                    this.productsInCart = action.productsInCart;
                    this.emit(Constants.EVENT_GET_PRODUCTS_FROM_CART);
                    break;
            }
        })
    }
}

export default new ProductsStore();