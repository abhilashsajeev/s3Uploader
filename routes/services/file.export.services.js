var express = require('express');
var router = express.Router();
var XLSX = require('xlsx');
var bluebird = require('bluebird');
var path = require('path');
var _ = require('lodash');
var mongoose = require('mongoose');
var mongoSchema = require('../config/models/mongo.db.schema.js');
var createMongoDb = require('./mongodb.services.js');
var awsService = require('./aws.services.js');
var tableColumns = require('../config/constants.js').TABLECOLUMNS;
var mongooseUrl = require('../config/constants.js').MONGOOSE_URL;
var filePaths;
var workbook;
var sheet_name_list;
var worksheet;
var xlsxData;
var directoryPath;
var stringifiedJson;
var originalName;
var Schema = mongoose.Schema;
mongoose.connect(mongooseUrl);

var fileUploadFunction = function (uploadedfile) {
  if (uploadedfile && (path.extname(uploadedfile.originalname) === '.xlsx')) {
    filePaths = path.resolve(uploadedfile.path);
    workbook = XLSX.readFile(filePaths);
    sheet_name_list = workbook.SheetNames;
    originalName = uploadedfile.originalname;
    var countOfPage = 0;
    var falseData = true;
    _.forEach(sheet_name_list, function (sheetName) {
      worksheet = workbook.Sheets[sheetName];
      xlsxData = XLSX.utils.sheet_to_json(worksheet);
      _.forEach(xlsxData, function (jsonObject) {
        countOfPage = countOfPage + 1;
        if ((jsonObject[tableColumns.categoryIDName]) && (jsonObject[tableColumns.categoryName])) {
          falseData = false;
        }
      });
    });
    if (falseData) {
      var err = new Error('Upload a valid key file');
      err.status = 400;
      return bluebird.reject(err);
    }
    var count = 0;
    return bluebird.map(sheet_name_list, function (sheetName) {
      worksheet = workbook.Sheets[sheetName];
      xlsxData = XLSX.utils.sheet_to_json(worksheet);
      return bluebird.map(xlsxData, function (jsonObject) {
        if ((jsonObject[tableColumns.categoryIDName]) && (jsonObject[tableColumns.categoryName])) {
          count = count + 1;
          directoryPath = sheetName.replace(/\s/g, '_') + '/' + (jsonObject[tableColumns.categoryName].replace(
              /\s>\s|>\s/g, '/')) + '/' +
            jsonObject[tableColumns.categoryIDName] + '.json';
          directoryPath = directoryPath.replace(/\s/g, '_');
          var tempId = sheetName + jsonObject[tableColumns.categoryIDName] + jsonObject[tableColumns.categoryName];
          mongoSchema = {
            originalSheetName: originalName,
            sheetListName: sheetName,
            categoryID: jsonObject[tableColumns.categoryIDName],
            category: jsonObject[tableColumns.categoryName],
            metaTitle: jsonObject[tableColumns.metaTitleName],
            metaDescription: jsonObject[tableColumns.metaDescriptionName],
            mongoId: tempId
          };
          var modifiedObject = {
            metaTitle: jsonObject[tableColumns.metaTitleName],
            metaDescription: jsonObject[tableColumns.metaDescriptionName]
          };
          stringifiedJson = JSON.stringify(modifiedObject);

          return bluebird.join(createMongoDb.createdb(mongoSchema), awsService.awsUploading(directoryPath,
              stringifiedJson))
            .then(function (data) {
              var result = {
                countOfPage: countOfPage,
                retreived: count
              };
              return bluebird.resolve(result);
            }, function (err) {
              return bluebird.reject('err');
            });
        }
      }).then(function (data) {
        return bluebird.resolve(data);
      }, function (err) {
        return bluebird.reject('err');
      });
    }).then(function (data) {
      var result = {
        countOfPage: countOfPage,
        retreived: count
      };

      return bluebird.resolve(result);

    }, function (err) {
      console.log(err);
      return bluebird.reject('err');
    });
  } else {
    var error = new Error('Error On Uploading');
    error.status = 400;
    return bluebird.reject(error);
  }
};

module.exports = {
  fileUploadFunction: fileUploadFunction
};
