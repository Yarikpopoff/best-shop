const knex = require('utils').getKnex();
const Promise = require('bluebird');
const db = require('utils').getDB();
const fs = Promise.promisifyAll(require('fs'));

const {log, error} = require('debugger')("products");

function getProducts() {
    const builder = knex.select().from('product');
    const {sql, bindings} = builder.toSQL();
    log(`[getProducts][sql] ${sql} [${bindings}]`);
    return db.all(sql)
        .then(products => {
            return products;
        });
}

function getProductsById(id) {
    const builder = knex.select().from('product').where('id', id);
    const {sql, bindings} = builder.toSQL();
    log(`[getProductsById][sql] ${sql} [${bindings}]`);
    return db.all(sql, bindings)
        .then(([product]) => {
            return product || null;
        });
}

function* createProducts(body) {

    log(`[createProducts] body `, body);
    const blob  = body.file;
    const filename  = body.filename;
    log(`[createProducts] boblobdy `, blob);
    if (body.file){
        delete body.file;
    }
    if (body.filename){
        delete body.filename;
    }
    if (body.filetype){
        delete body.filetype;
    }
    const builder = knex('product').insert(body);
    const {sql, bindings} = builder.toSQL();
    log(`[createProducts][sql] ${sql} [${bindings}]`);
    const values = yield db.run(sql, bindings);
    //yield mkdirp.mkdirpAsync(data);
    yield fs.writeFileAsync(`d:/qwe/${filename}`, blob, 'binary');
    return 1
}

function editProduct(id, body) {
    const builder = knex('product').update(body).where('id', id);
    const {sql, bindings} = builder.toSQL();
    log(`[getProductsById][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings)
        .then(() => {
            return getProductsById(id);
        });
}

function deleteProduct(id) {
    const builder = knex('product').delete().where('id', id);
    const {sql, bindings} = builder.toSQL();
    log(`[deleteProduct][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings);
}

module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    editProduct,
    deleteProduct
};
