'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var fileUpload = require('../controllers/upload-file.js');
var k = require('../../config/constants.js');

var upload = multer({
  dest: k.MULTER.DESTINATION
});

router.get('/', function (req, res, next) {
  var filePath = path.resolve(__dirname + k.HOME_HTML_PATH);
  fs.createReadStream(filePath).pipe(res);
});

router.post('/upload-file', upload.single('file'), function (req, res, next) {
  fileUpload.processFileUpload(req.file)
    .then(function () {
      res.writeHead(200);
      res.end('Your file uploaded successfully');
    }, function (err) {
      res.writeHead(err.status || 500);
      res.end(err.message || 'Upload Failed due to some internal issues.');
    });
});

module.exports = router;
