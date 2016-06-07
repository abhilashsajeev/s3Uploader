'use strict';

const express = require('express');
const router = express.Router();
var multer = require('multer');
const uploadCtrl = require('../controllers/upload-controller');
var k = require('../../config/constants');

var upload = multer({
  dest: k.UPLOAD_FOLDER_PATH
});

router.post('/api/upload', upload.single('file'), uploadCtrl.uploadFile);

module.exports = router;
