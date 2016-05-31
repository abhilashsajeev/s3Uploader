'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var bluebird = require('bluebird');
var xlsx = require('xlsx');

var awsUpload = require('../utilities/aws-upload.js');

var upload = multer({
  dest: 'uploads/'
});


/* GET home page. */
router.get('/', function (req, res, next) {
  var filePath = path.resolve(__dirname + '/../public/home.html');
  fs.createReadStream(filePath).pipe(res);
});

router.post('/', upload.single('file'), function (req, res, next) {
  var categoryId = 'Category ID ';
  var category = 'Category';
  var workbook = xlsx.readFile(req.file.path);
  bluebird.map(workbook.SheetNames, function (item) {
    var jsonArray = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
    return bluebird.map(jsonArray, function (obj) {

      if (obj !== undefined && obj[categoryId] !== undefined && obj[category] !== undefined) {
        var filePath = 'JSON_Files/' + obj[category].trim().replace(/\s>\s/g, '/');
        var jsonFilePath = filePath + '/' + obj[categoryId] + '.json';
        delete obj[categoryId];
        delete obj[category];
        awsUpload(obj, jsonFilePath);
      }

    });
  });
  var filePath = path.resolve(__dirname + '/../public/home.html');
  fs.createReadStream(filePath).pipe(res);

});

module.exports = router;
