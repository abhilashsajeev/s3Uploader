'use strict';

var _ = require('lodash');
var bluebird = require('bluebird');
var xlsx = require('xlsx');
var awsUpload = require('../services/aws-services.js');
var dbServices = require('../services/db-services.js');
var jsonDataModel = require('../models/json-file-schema.js');
var path = require('path');

var k = require('../../config/constants.js');

var processFileUpload = function (uploadFile) {
  if (uploadFile && (path.extname(uploadFile.originalname) === '.xlsx' || path.extname(uploadFile.originalname) ===
      '.csv')) {
    var workbook = xlsx.readFile(uploadFile.path);
    return bluebird.map(workbook.SheetNames, function (item) {
      var jsonArray = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
      return bluebird.map(jsonArray, function (obj) {
        if (obj && obj[k.EXCEL_HEADER.CATEGORY_ID] && obj[k.EXCEL_HEADER.CATEGORY]) {
          var newJsonData = {
            documentName: uploadFile.originalname,
            sheetName: item,
            jsonObject: {
              categoryID: obj[k.EXCEL_HEADER.CATEGORY_ID],
              category: obj[k.EXCEL_HEADER.CATEGORY],
              metaTitle: obj[k.EXCEL_HEADER.META_TITLE],
              metaDescription: obj[k.EXCEL_HEADER.META_DESCRIPTION]
            }
          };
          var filePath = 'JSON_Files/' + obj[k.EXCEL_HEADER.CATEGORY].trim().replace(/\s>\s/g, '/');
          var jsonFilePath = filePath + '/' + obj[k.EXCEL_HEADER.CATEGORY_ID] + '.json';
          obj = _.omit(obj, [k.EXCEL_HEADER.CATEGORY_ID, k.EXCEL_HEADER.CATEGORY]);
          return bluebird.join(dbServices.create(jsonDataModel, newJsonData), awsUpload(obj, jsonFilePath))
            .then(function (data) {
              return bluebird.resolve(data);
            }, function (err) {
              return bluebird.reject(err);
            });

        }
      });
    });
  } else {
    var err = new Error('You must upload a XLSX/CSV file.');
    err.status = 400;
    return bluebird.reject(err);
  }
};

module.exports = {
  processFileUpload: processFileUpload
};
