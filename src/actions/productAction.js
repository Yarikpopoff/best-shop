import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

const api = require('../api/product');

export function getProduct(){
    return api.getProduct()
        .then(products=>{
            Dispatcher.dispatch({
                type: Constants.GET_LIST_PRODUCTS,
                products: products
            })
        })
        .catch(e=>{console.log(e)})
}
export function createProduct(product){
    return api.createProduct(product)
        .then(products=>{
            getProduct();
        })
}
export function updateProduct(id, product){
    return api.updateProduct(id, product)
        .then(products=>{
            getProduct();
        })
}
export function deleteProduct(id){
    return api.deleteProduct(id)
        .then(products=>{
            getProduct();
        })
}