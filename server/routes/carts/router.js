const express = require('express');
const router = express.Router();
const handler = require('./handler');

const validate = require('validation');
const { cartSchema } = require('schema');

router.get('/', handler.getAllCart);
router.get('/:id', handler.getSingleCart);
router.post('/', validate(cartSchema), handler.createCart);
router.put('/:id', validate(cartSchema), handler.editCart);
router.delete('/:id', handler.deleteCart);

module.exports = router;