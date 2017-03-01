const db = require('../../utils/utils').getDB();

function getProducts() {
    return db.all('SELECT * FROM product')
        .then(products => {
            return products;
        });
}

function getProductsById(id) {
    return db.all('SELECT * FROM product WHERE id = ?', id)
        .then(([product]) => {
            return product || null;
        });
}

function createProducts(body) {
    return db.run('insert into product (name, price, img_name, description) VALUES (?,?,?,?)',
        [body.name, body.price, body.img_name, body.description])
        .then((values) => {
            const id = values.stmt.lastID;
            return getProductsById(id);
        });
}

function editProduct(id, body) {
    const s = Object.keys(body).map((x) => {
        return x + "='" + body[x] + "'";
    }).join(',');
    const sql = 'update product set ' + s + ' where id=?';
    console.log(`[][][sql] ${sql}`);
    return db.run(sql, [id])
        .then(() => {
            return getProductsById(id);
        });
}

function deleteProduct(id) {
    return db.run('delete from product where id=?', [id]);
}

module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    editProduct,
    deleteProduct
};
