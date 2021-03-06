'use strict';

const express = require('express');
let router = express.Router();

router.use('/version', require('./version/router'));
router.use('/products', require('./products/router'));
router.use('/carts', require('./carts/router'));

module.exports = router;
