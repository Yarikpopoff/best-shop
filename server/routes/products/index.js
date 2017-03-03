const db = require('../../utils/utils').getDB();
const knex = require('../../utils/utils').getKnex();

function getProducts() {
    const builder = knex.select().from('product');
    const {sql, bindings} = builder.toSQL();
    console.log(`[products][getProducts][sql] ${sql} [${bindings}]`);
    return db.all(sql)
        .then(products => {
            return products;
        });
}

function getProductsById(id) {
    const builder = knex.select().from('product').where('id', id);
    const {sql, bindings} = builder.toSQL();
    console.log(`[products][getProductsById][sql] ${sql} [${bindings}]`);
    return db.all(sql, bindings)
        .then(([product]) => {
            return product || null;
        });
}

function createProducts(body) {
    const builder = knex('product').insert(body);
    const {sql, bindings} = builder.toSQL();
    console.log(`[products][createProducts][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings)
        .then((values) => {
            const id = values.stmt.lastID;
            return getProductsById(id);
        });
}

function editProduct(id, body) {
    const builder = knex('product').update(body).where('id', id);
    const {sql, bindings} = builder.toSQL();
    console.log(`[products][getProductsById][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings)
        .then(() => {
            return getProductsById(id);
        });
}

function deleteProduct(id) {
    const builder = knex('product').delete().where('id', id);
    const {sql, bindings} = builder.toSQL();
    console.log(`[products][deleteProduct][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings);
}

module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    editProduct,
    deleteProduct
};
