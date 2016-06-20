'use strict';
const router = require('express').Router();
const listController = require('../controllers/listing-controller');

router.get('/sheets', listController.sheetName);
router.get('/data', listController.listFetch);

module.exports = router;
