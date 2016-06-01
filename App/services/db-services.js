'use strict';

var bluebird = require('bluebird');

var create = function (model, dataJson) {
  var newJsonData = new model(dataJson);
  newJsonData.save()
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });;
};

module.exports = {
  create: create
};
