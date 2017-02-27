const express = require('express');
const router = express.Router();
const handler = require('./handler');

router.get('/', handler.versionHandler);

module.exports = router;
