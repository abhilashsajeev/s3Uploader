'use strict';
const router = require('express').Router();
const updateController = require('../controllers/update-Controller');

router.post('/', updateController.updateMongo);

module.exports = router;
