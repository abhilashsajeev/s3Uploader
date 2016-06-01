'use strict';

var express = require('express');
var router = express.Router();
var uploadCtrl = require('../controllers/upload-controller');
router.post('/fileUpload', function (req, res){
uploadCtrl.upload(req);

});

module.exports = router;
