'use strict';

var xlsx = require('xlsx');
var _ = require('lodash');
var bluebird = require('bluebird');
var aws = require('./aws-utils');

module.exports.parseExcelSheets = function (filePath) {
  var workbook = xlsx.readFile('./uploads/metaData.xlsx');
  var worksheets;
  var sheetJSON;
  var sheetNameList = workbook.SheetNames;
  return bluebird.map(sheetNameList, function (item) {
    worksheets = workbook.Sheets[item];
    sheetJSON = xlsx.utils.sheet_to_json(worksheets);
    return bluebird.map(sheetJSON, function (object) {
      if (object['Category ID '] && object.Category) {
        var modifiedObject = _.assign({
          metaDescription: object['Meta Description'],
          metaTitle: object['Meta Title']
        });
        var filePath = (object.Category.replace(/\s>\s|\s/g, '/')).trim() + '/' +
          object['Category ID '] + '.json';
        return aws.upload(filePath, JSON.stringify(modifiedObject));
      }
    });
  });
};
