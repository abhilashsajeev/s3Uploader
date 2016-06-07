'use strict';

var xlsx = require('xlsx');
var _ = require('lodash');
var bluebird = require('bluebird');
var aws = require('./aws-services.js');
var k = require('../../config/constants');
var db = require('./db-service');

module.exports.uploadMethod = function (fileName) {
  var workbook = xlsx.readFile(k.UPLOAD_FOLDER_PATH + fileName);
  var worksheets;
  var sheetJSON;
  var sheetNameList = workbook.SheetNames;
  var validationStatus = false;
  var validationStatusArray = [];
  var successRowCount = 0;
  var totalCount = 0;
  _.forEach(sheetNameList, function (item) {
    worksheets = workbook.Sheets[item];
    if (worksheets.A1 && worksheets.B1 && worksheets.C1 && worksheets.D1) {
      var keys = [worksheets.A1.v, worksheets.B1.v, worksheets.C1.v, worksheets.D1.v];
      if (_.isEqual(keys, k.HEADERS)) {
        validationStatus = true;
      } else {
        validationStatusArray.push(item);
      }
    } else {
      validationStatusArray.push(item);
    }
  });
  if (!validationStatus) {
    var err = new Error('Invalid');
    return bluebird.reject(err);
  } else {}
  return bluebird.map(sheetNameList, function (item) {
    worksheets = workbook.Sheets[item];
    sheetJSON = xlsx.utils.sheet_to_json(worksheets);
    return bluebird.map(sheetJSON, function (object) {
      totalCount = totalCount + 1;
      if (object[k.CATEGORYID] && object.Category) {
        successRowCount = successRowCount + 1;
        var modifiedObject;
        modifiedObject = {
          metaTitle: object[k.META_TITLE],
          metaDescription: object[k.META_DESCRIPTION]
        };
        var filePath = (item + '/' + object.Category.replace(/\s>\s|>\s|>|\s>/g, '/')).trim() +
          '/' + object[k.CATEGORYID] + '.json';
        filePath = filePath.replace(/\s/g, '_');
        object.awsLink = k.AWS_LINK + filePath;
        object.sheetName = item;
        return bluebird.join(db.writeToDatabase(object), aws.upload(filePath, JSON.stringify(
            modifiedObject)))
          .then(function (data) {
            var uploadStatus = {
              totalRows: totalCount,
              successRows: successRowCount
            };
            return (uploadStatus);
          }, function (err) {
            return bluebird.reject(err);
          });
      };
    });
  }).then(function () {
    var uploadStatus = {
      totalRows: totalCount,
      successRows: successRowCount
    };
    return uploadStatus;
  });
};
