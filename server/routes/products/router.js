const express = require('express');
const router = express.Router();
const handler = require('./handler');

router.get('/', handler.getAllProduct);
router.get('/:id', handler.getSingleProduct);
router.post('/', handler.createProduct);
router.put('/:id', handler.editProduct);
router.delete('/:id', handler.deleteProduct);

module.exports = router;