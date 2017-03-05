const api = require('../api/product');

export function getProduct(){
    return api.getProduct()
        .then(rows=>{
            dispatcher.dispatch({
                action: cnst.GET_PRODUCTS,
                product: rows
            })
        })
}
export function createProduct(product){
    return api.createProduct(product)
        .then(rows=>{
            getProduct();
        })
}
export function updateProduct(id, product){
    return api.updateProduct(id, product)
        .then(rows=>{
            getProduct();
        })
}
export function deleteProduct(id){
    return api.deleteProduct(id)
        .then(rows=>{
            getProduct();
        })
}