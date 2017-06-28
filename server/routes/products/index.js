const knex = require('utils').getKnex();
const Promise = require('bluebird');
const db = require('utils').getDB();
const fs = Promise.promisifyAll(require('fs'));
const config = require('../../conf');

const {log, error} = require('debugger')("products");

function* getProducts() {
    const {sql, bindings} = knex.select().from('product').toSQL();
    log(`[getProducts][sql] ${sql} [${bindings}]`);
    return yield db.all(sql);
}

function* getProductsById(id) {
    const {sql, bindings} = knex.select().from('product').where('id', id).toSQL();
    log(`[getProductsById][sql] ${sql} [${bindings}]`);
    return yield db.all(sql, bindings).get(0);
}

function _createProductCreate(body) {
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
    return {body, blob, filename};
}

function* createProducts(data) {
    log(`[createProducts] body `, data);
    const {body, blob, filename} = _createProductCreate(data);
    const  {sql, bindings} = knex('product').insert(body).toSQL();
    log(`[createProducts][sql] ${sql} [${bindings}]`);
    yield db.run(sql, bindings);
    yield fs.writeFileAsync(`${config.get("image-path")}${data.img_name}`, blob, 'binary');
    // return yield getProductsById()
}

function* editProduct(id, body) {
    const {sql, bindings} = knex('product').update(body).where('id', id).toSQL();
    log(`[getProductsById][sql] ${sql} [${bindings}]`);
    yield db.run(sql, bindings);
    return yield* getProductsById(id);
}

function* deleteProduct(id) {
    const product = yield* getProductsById(id);
    if (product) {
        const {sql, bindings} = knex('product').delete().where('id', id).toSQL();
        log(`[deleteProduct][sql] ${sql} [${bindings}]`);
        yield db.run(sql, bindings);
        yield fs.unlinkAsync(`${config.get("image-path")}${product.img_name}`);
    }
    return 200;
}

module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    editProduct,
    deleteProduct
};
