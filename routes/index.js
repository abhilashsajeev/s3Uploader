'use strict';
var express = require('express');
var router = express.Router();
var XLSX = require('xlsx');
var Promise = require('bluebird');
var AWS = require('aws-sdk');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({
  dest: 'uploads/'
});
var filePaths;
var workbook;
var sheet_name_list;
var categoryName = 'Category';
var metaTitleName = 'Meta Title';
var MetaDescriptionName = 'Meta Description';
var worksheet;
var data;
var directoryPath;
var client;
var stringifiedJson;
var jsonObject;
var originalName;
var categoryIDName = 'Category ID ';

/* GET home page. */
router.get('/', function (req, res, next) {
  var filePath = path.resolve(__dirname + '/../public/index.html');
  fs.createReadStream(filePath).pipe(res);
});

/* GET home page. */
router.post('/', upload.single('file'), function (req, res, next) {
  filePaths = path.resolve(req.file.path);
  workbook = XLSX.readFile(filePaths);
  sheet_name_list = workbook.SheetNames;
  originalName = req.file.originalname;
  sheet_name_list.forEach(function (sheetName) { /* iterate through sheets */
    worksheet = workbook.Sheets[sheetName];
    data = XLSX.utils.sheet_to_json(worksheet);
    Promise.each(data, function (jsonObject) {
      if ((jsonObject[categoryIDName]) && (jsonObject[categoryName])) {
        directoryPath = (jsonObject[categoryName].replace(/\s>\s|>\s/g, '/')) + '/' + jsonObject[
            categoryIDName] +
          '.json';
        delete jsonObject[categoryName];
        delete jsonObject[categoryIDName];
        stringifiedJson = JSON.stringify(jsonObject);
        var config = {
          s3ForcePathStyle: true,
          accessKeyId: 'ACCESS_KEY_ID',
          secretAccessKey: 'SECRET_ACCESS_KEY',
          endpoint: new AWS.Endpoint('http://localhost:4567'),
          sslEnabled: false
        };
        client = new AWS.S3(config);
        var params = {
          Bucket: 'QWERTY'
        };
        params.Key = directoryPath;
        params.Body = stringifiedJson;
        client.upload(params, function uploadCallback(err, data) { // upload to S3
          if (!err) {}
        });
      }
    });
  });
  var filePath = path.resolve(__dirname + '/../public/index.html');
  fs.createReadStream(filePath).pipe(res);
});
module.exports = router;
