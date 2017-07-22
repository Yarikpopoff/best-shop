const db = require('utils').getDB();
const mohair = require('mohair');
const {log, error} = require('debugger')("cart");
const Promise = require('bluebird');

function getCarts() {
    const builderCart = mohair.table('cart').select();
    const builderCartSql  = builderCart.sql();
    const builderCartParams = builderCart.params();
    log(`[cart][sql] ${builderCartSql} [${builderCartParams}]`);

    const builderCartProduct = mohair.table('cart_product').select();
    const builderCartProductSql  = builderCartProduct.sql();
    const builderCartProductParams = builderCartProduct.params();
    log(`[cart_product][sql] ${builderCartProductSql} [${builderCartProductParams}]`);

    const builderProduct = mohair.table('product').select();
    const builderProductSql  = builderProduct.sql();
    const builderProductParams = builderProduct.params();
    log(`[product][sql] ${builderProductSql} [${builderProductParams}]`);

    return Promise.join(
        db.all(builderCartSql, builderCartParams),
        db.all(builderCartProductSql, builderCartProductParams),
        db.all(builderProductSql, builderProductParams)
    )
        .then(([ carts, cartProducts, products]) => {
            const resultCarts = carts.map(cart => {
                const productIds = cartProducts.filter(y => y.cart_id === cart.id).map(z => z.product_id);
                cart.product_list = products.filter(x => productIds.some(y => y === x.id));
                return cart;
            });
            return resultCarts;
        });

}

function getCartById(id) {
    let builder = mohair.table('cart').select().where({'id': id});
    const sql  = builder.sql();
    const params = builder.params();
    log(`[cart_product][sql] ${sql} [${params}]`);
    return Promise.join(
        db.all(sql, bindings),
        findProductByCartId(id)
    )
        .then(([carts, products]) => {
            if (carts && carts.length) {
                const cart = carts[0];
                cart.product_list = products;
                return cart;
            } else {
                return null;
            }
        });
}

function createCart(body) {
    const items = body.product_list;
    delete body.product_list;
    let builder = mohair.table('cart').insert(body);
    const sql  = builder.sql();
    const params = builder.params();
    log(`[createCart][sql] ${sql} [${params}]`);
    return db.run(sql, params)
        .then((values) => {
            const id = values.stmt.lastID;
            const cart_products = items.map(x => {
                return {cart_id: id, product_id: x}
            });
            let builder = mohair.table('cart_product').insert(cart_products);
            let {sql, bindings} = builder.toSQL();
            return db.run(sql, bindings)
        })
        .then(() => {
            return getCartById(id);
        });
}

// todo
function editCart(id, body) {
    return Promise.resolve(`todo`);
    const builder = mohair.table('cart').update(body).where({'id': id});
    const sql  = builder.sql();
    const params = builder.params();
    log(`[editCart][sql] ${sql} [${params}]`);
    return db.run(sql, params)
        .then(() => {
            return getCartById(id);
        });
}

function deleteCart(id) {
    log(`[deleteProduct][sql] ${id}`);
    const builderCart = mohair.table('cart').delete().where({'id': id});
    const builderCartSql  = builderCart.sql();
    const builderCartParams = builderCart.params();
    log(`[deleteProduct][sql] ${builderCartSql} [${builderCartParams}]`);

    const builderCartProduct = mohair.table('cart_product').where('cart_id', id).delete();
    const builderCartProductSql  = builderCartProduct.sql();
    const builderCartProductParams = builderCartProduct.params();
    log(`[deleteProduct][sql] ${builderCartProductSql} [${builderCartProductParams}]`);

    return Promise.join(
        db.run(builderCartSql, builderCartParams),
        db.run(builderCartProductSql, builderCartProductParams)
    )
}

function findProductByCartId(id) {
    let builder = mohair.table('cart_product').select().where({'cart_id': id}); //.whereIn('id', [1, 2, 3]);
    const sql  = builder.sql();
    const params = builder.params();
    log(`[getCartById][cart][sql] ${sql} [${params}]`);
    return db.all(sql, params)
        .then((products_ids) => {
            let builder = mohair.table('product').whereIn('id', products_ids.map(x => x.product_id));
            const sql  = builder.sql();
            const params = builder.params();
            return db.all(sql, params);
        })
}

module.exports = {
    getCarts,
    getCartById,
    createCart,
    editCart,
    deleteCart
};
