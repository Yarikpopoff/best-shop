const axios = require('axios');
const host = "http://127.0.0.1:8084";
const blueBird = require('bluebird');

export function getProduct() {
    // return blueBird.Promise.resolve([{id:3}]);
    return axios.get(host+"/api/products/")
        .then(({data})=> {
            return data.data;
        })
}

export function createProduct(product) {
    return axios.post(host+"/api/products/", product)
        .then(({data})=> data )
}

export function updateProduct(id, product) {
    return axios.put(host+"/api/products/"+id, product)
        .then(({data})=> data )
}

export function deleteProduct(id) {
    return axios.delete(host+"/api/products/"+id)
        .then(({data})=> data )
}
