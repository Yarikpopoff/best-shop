import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import ProductsStore from '../stores/ProductsStore';

const api = require('../api/cart');

export function getProductFromCart(){
    return api.getProductFromCart()
        .then(productsInCart=>{
            Dispatcher.dispatch({
                type: Constants.GET_PRODUCTS_FROM_CART,
                productsInCart: productsInCart
            });
        })
        .catch(e=>{console.log(e)})
}
export function postProductToCart(productToCart){
    return api.postProductToCart(productToCart)
        .then(productToCart=>{
            getProductFromCart();
        })
}