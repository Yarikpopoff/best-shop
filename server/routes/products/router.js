const express = require('express');
const router = express.Router();
const handler = require('./handler');

const validate = require('../../middleware/validation');
const {productSchema} = require('../../schema/product');

router.get('/', handler.getAllProduct);
router.get('/:id', handler.getSingleProduct);
router.post('/', validate(productSchema), handler.createProduct);
router.put('/:id', validate(productSchema), handler.editProduct);
router.delete('/:id', handler.deleteProduct);

module.exports = router;