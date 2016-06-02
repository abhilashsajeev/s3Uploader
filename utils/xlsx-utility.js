'use strict';
var xlsx = require('xlsx');
var bluebird = require('bluebird');
var s3 = require('./s3-utility.js');
var mongoUtil = require('./mongo-utility.js');

function parseFile(fileName) {
  var workbook = xlsx.readFile('./uploads/' + fileName);
  var worksheets = [];
  var sheetJSON = [];
  var sheetNameList = workbook.SheetNames;
  var i = 0;
  sheetNameList.forEach(function(y){
    worksheets[i] = workbook.Sheets[y];
    sheetJSON[i] = xlsx.utils.sheet_to_json(worksheets[i]);
    bluebird.each(sheetJSON[i], function(jsonObject) {
      if (jsonObject['Category ID '] && jsonObject.Category) {
        mongoUtil.writeJSONToDB(jsonObject);
        var s3FilePath = (jsonObject.Category.replace(/\s>\s/g,'/')) + '/' +
          jsonObject['Category ID '] + '.json';
        delete jsonObject.Category;
        delete jsonObject['Category ID '];
        var stringifiedJSON = JSON.stringify(jsonObject);
        s3.s3Handling(s3FilePath, stringifiedJSON);
      }
    });
    i = i + 1;
  });
}

module.exports = {
  parseFile: parseFile
};
