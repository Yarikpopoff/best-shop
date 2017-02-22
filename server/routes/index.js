'use strict';

const express = require('express');
let router = express.Router();
const handler = require('./version/handler');

router.use('/version', handler.versionHandler);

module.exports = router;
