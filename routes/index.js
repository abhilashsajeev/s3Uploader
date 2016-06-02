'use strict';
var express = require('express');
var router = express.Router();
var xlsxUtil = require('../utils/xlsx-utility.js');
var multer = require('multer');
var _ = require('lodash');

var storedFileName = '';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    var nameSplitArray = _.split(file.originalname, '.', 10);
    var extension = nameSplitArray[nameSplitArray.length - 1];
    storedFileName = file.fieldname + '-' + Date.now() + '.' + extension;
    cb(null, storedFileName);
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) { //eslint-disable-line no-unused-vars
  var pathToIndexHtml = _.trimEnd(__dirname, 'routes');
  res.sendFile(pathToIndexHtml + 'index.html');
});

/* POST File for upload */
router.post('/file', upload.single('input'),
  function (req, res, next) { //eslint-disable-line no-unused-vars
  var nameSplitArray = _.split(req.file.originalname, '.', 10);
  var extension = nameSplitArray[nameSplitArray.length - 1];
  if (extension !== 'xlsx' && extension !== 'csv') {
    fs.unlink('uploads/' + storedFileName, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    res.sendStatus(415);
  }
  xlsxUtil.parseFile(storedFileName);
  res.sendStatus(200);
});

module.exports = router;
