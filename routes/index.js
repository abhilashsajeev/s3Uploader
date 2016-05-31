'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var k = require('../config/constants.js');
var upload = multer({
  dest: k.UPLOAD_FOLDER_PATH
});

/* GET home page. */
router.get('/', function (req, res, next) {
  var filePath = path.resolve(__dirname + '/../public/index.html');
  fs.createReadStream(filePath).pipe(res);
});

router.post('/api/upload', upload.single('file'), function (req, res, next) {
  if (req.file) {
    res.send('ok');
  } else {
    res.send('failed');
  }
});

module.exports = router;
