const db = require('utils').getDB();
const knex = require('utils').getKnex();
const {log, error} = require('debugger')("cart");
const Promise = require('bluebird');

function getCarts() {
    const builderCart = knex.select().from('cart');
    const {sql: sqlCart, bindings: bindingsCart} = builderCart.toSQL();
    log(`[cart][sql] ${sqlCart} [${bindingsCart}]`);

    const builderCartProduct = knex.select().from('cart_product');
    const {sql: sqlCartProduct, bindings: bindingsCartProduct} = builderCartProduct.toSQL();
    log(`[cart_product][sql] ${sqlCartProduct} [${bindingsCartProduct}]`);

    const builderProduct = knex.select().from('product');
    const {sql: sqlProduct, bindings: bindingsProduct} = builderProduct.toSQL();
    log(`[product][sql] ${sqlProduct} [${bindingsProduct}]`);

    return Promise.join(
            db.all(sqlCart, bindingsCart),
            db.all(sqlCartProduct, bindingsCartProduct),
            db.all(sqlProduct, bindingsProduct)
        )
        .then(([ carts, cartProducts, products])=>{
            const resultCarts = carts.map(cart=>{
                const productIds = cartProducts.filter(y => y.cart_id == cart.id).map(z => z.product_id);
                cart.product_list = products.filter(x => productIds.some(y => y == x.id));
                return cart;
            });
            return resultCarts;
        });

}

function getCartById(id) {
    return getCarts()
        .then(carts => {
            return carts.find(cart => cart.id == id)
        });
    /*
    let builder = knex.select().from('cart').where('id', id);
    let {sql, bindings} = builder.toSQL();
    log(`[getCartById][cart][sql] ${sql} [${bindings}]`);
    return db.all(sql, bindings)
        .then(([cart]) => {
            if (!cart){
                return null;
            }
            let builder = knex.select().from('cart_product').where('cart_id', cart.id); //.whereIn('id', [1, 2, 3]);
            let {sql, bindings} = builder.toSQL();
            log(`[getCartById][cart][sql] ${sql} [${bindings}]`);
            return db.all(sql, bindings)
                .then((products_ids)=>{
                    let builder = knex.select().from('product').whereIn('id', products_ids.map(x=>x.product_id));
                    let {sql, bindings} = builder.toSQL();
                    log(`[getCartById][cart][sql] ${sql} [${bindings}]`);
                    return db.all(sql, bindings)
                        .then((rows)=>{
                            cart.product_list = rows;
                            return cart;
                        });
                })
        });*/
}

function createCart(body) {
    const items = body.product_list;
    delete body.product_list;
    let builder = knex('cart').insert(body);
    let {sql, bindings} = builder.toSQL();
    log(`[createCart][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings)
        .then((values) => {
            const id = values.stmt.lastID;
            const cart_products = items.map(x=>{ return {cart_id: id, product_id: x}});
            let builder = knex('cart_product').insert(cart_products);
            let {sql, bindings} = builder.toSQL();
            return db.run(sql, bindings)
                .then(()=>{
                    return getCartById(id);
                });
        })

}

function editCart(id, body) {
    return;
    const builder = knex('cart').update(body).where('id', id);
    const {sql, bindings} = builder.toSQL();
    log(`[editCart][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings)
        .then(() => {
            return getCartById(id);
        });
}

function deleteCart(id) {
    return;
    const builder = knex('cart').delete().where('id', id);
    const {sql, bindings} = builder.toSQL();
    log(`[deleteProduct][sql] ${sql} [${bindings}]`);
    return db.run(sql, bindings);
}

module.exports = {
    getCarts,
    getCartById,
    createCart,
    editCart,
    deleteCart
};
