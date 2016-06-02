'use strict';

var parse = require('../utils/xlsx-parse');
var aws = require('../utils/aws-utils');

module.exports.route = function () {
  parse.parseExcelSheets()
    .then(function (jsonObject) {
      console.log('uploading completed');
    }, function (err) {
      console.log('err', err);
    });

};

module.exports.delete = function () {
  aws.deleteBucket()
    .then(function (data) {
      console.log('deletion completed');
    }, function (err) {
      console.log('err', err);
    });
};
