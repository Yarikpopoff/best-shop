const mohair = require('mohair');
const Promise = require('bluebird');
const db = require('utils').getDB();
const fs = Promise.promisifyAll(require('fs'));
const config = require('../../conf');

const {log, error} = require('debugger')("products");

function* getProducts() {
    const query = mohair.table('product').select();
    const sql  = query.sql();
    const params = query.params();
    log(`[getProducts][sql] ${sql} [${params}]`);
    return yield db.all(sql);
}

function* getProductsById(id) {
    const query = mohair.table('product').where({'id':id});
    const sql  = query.sql();
    const params = query.params();
    log(`[getProductsById][sql] ${sql} [${params}]`);
    return yield db.all(sql, params).get(0);
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
    const  query = mohair.table('product').insert(body);
    const sql  = query.sql();
    const params = query.params();
    log(`[createProducts][sql] ${sql} [${params}]`);
    yield db.run(sql, params);
    yield fs.writeFileAsync(`${config.get("image-path")}${data.img_name}`, blob, 'binary');
    // return yield getProductsById()
}

function* editProduct(id, body) {
    const query = mohair.table('product').update(body).where({'id': id});
    const sql  = query.sql();
    const params = query.params();
    log(`[getProductsById][sql] ${sql} [${params}]`);
    yield db.run(sql, params);
    return yield* getProductsById(id);
}

function* deleteProduct(id) {
    const product = yield* getProductsById(id);
    if (product) {
        const query = mohair.table('product').where({'id': id}).delete();
        const sql  = query.sql();
        const params = query.params();
        log(`[deleteProduct][sql] ${sql} [${params}]`);
        yield db.run(sql, params);
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
