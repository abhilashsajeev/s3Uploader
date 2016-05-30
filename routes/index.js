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
    console.log(nameSplitArray);
    console.log(extension);
    storedFileName = file.fieldname + '-' + Date.now() + '.' + extension;
    cb(null, storedFileName);
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) { //eslint-disable-line no-unused-vars
  res.sendFile('/home/meharoof/Documents/s3Uploader/html/index.html');
});

/* POST File for upload */
router.post('/file', upload.single('input'),
  function (req, res, next) { //eslint-disable-line no-unused-vars
  console.log('file upload entered');
  console.log(req.body);
  console.log(req.file);
  var nameSplitArray = _.split(req.file.originalname, '.', 10);
  var extension = nameSplitArray[nameSplitArray.length - 1];
  if (extension !== 'xlsx' && extension !== 'csv') {
    fs.unlink('uploads/' + storedFileName, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('File deleted successfully');
    });
    res.sendStatus(415);
  }
  console.log('parseFile method is gonna get called');
  xlsxUtil.parseFile(storedFileName);
  res.sendStatus(200);
});

module.exports = router;
