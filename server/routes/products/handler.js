const api = require('./index');

function createProduct(req, res, next) {
    api.createProducts(req.data)
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function getAllProduct(req, res, next) {
    api.getProducts()
        .then(rows => {
            res.json({data: rows});
        })
        .catch((err) => {
            next(err);
        });
}
function getSingleProduct(req, res, next) {
    api.getProductsById(req.params.id)
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function editProduct(req, res, next) {
    api.editProduct(req.params.id, req.data)
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function deleteProduct(req, res, next) {
    api.deleteProduct(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
}
module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    editProduct,
    deleteProduct
};
