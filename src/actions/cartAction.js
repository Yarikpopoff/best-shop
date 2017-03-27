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
export function putProductToCart(productToCart){
    return api.putProductToCart(productToCart)
        .then(productToCart=>{
            getProductFromCart();
        })
}