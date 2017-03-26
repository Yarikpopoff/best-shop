const axios = require('axios');
const host = "http://127.0.0.1:8084";
const blueBird = require('blueBird');

export function getProductFromCart() {
    // return blueBird.Promise.resolve([{id:3}]);
    return axios.get(host+"/api/carts/")
        .then(({data})=> {
            return data.data;
        })
}

export function putProductToCart(productToCart) {
    return axios.post(host+"/api/carts/", productToCart)
        .then(({data})=> data )
}