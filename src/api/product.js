const axios = require('axios');
const blueBird = require('bluebird');

export function getProduct() {
    // return blueBird.Promise.resolve([{id:3}]);
    return axios.get("/api/products/")
        .then(({data})=> {
            return data.data;
        })
}

export function createProduct(product) {
    return axios.post("/api/products/", product)
        .then(({data})=> data )
}

export function updateProduct(id, product) {
    return axios.put("/api/products/"+id, product)
        .then(({data})=> data )
}

export function deleteProduct(id) {
    return axios.delete("/api/products/"+id)
        .then(({data})=> data )
}
