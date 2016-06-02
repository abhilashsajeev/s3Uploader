var _ = require('lodash');
var db = require('../services/mongodb.services.js');
var mongoSchema = require('../config/models/mongo.db.schema.js');
var bluebird = require('bluebird');
var mongoose = require('mongoose');
var mongoDataModel = mongoose.model('mongoDataModel', mongoSchema);
module.exports.regionNameFetching = function () {
  return db.getDataFromMongoDb(mongoDataModel)
  .then(function (data) {
    var sheetsName = [];
    _.forEach(data, function (item) {
      if (item.sheetListName && !_.includes(sheetsName, item.sheetListName)) {
        sheetsName.push(item.sheetListName);
      }
    });
    return bluebird.resolve(sheetsName);
  }, function (err) {
    return bluebird.reject(err);
  });
};
