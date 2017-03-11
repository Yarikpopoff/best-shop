const api = require('./index');

function createCart(req, res, next) {
    api.createCart(req.data)
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function getAllCart(req, res, next) {
    api.getCarts()
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function getSingleCart(req, res, next) {
    api.getCartById(req.params.id)
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function editCart(req, res, next) {
    api.editCart(req.params.id, req.data)
        .then(rows => {
            res.json({data: rows});
        })
        .catch(next);
}
function deleteCart(req, res, next) {
    api.deleteCart(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
}
module.exports = {
    createCart,
    getAllCart,
    getSingleCart,
    editCart,
    deleteCart
};