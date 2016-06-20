var db = require('./mongodb.services.js');
var mongoSchema = require('../config/models/mongo.db.schema.js');
var bluebird = require('bluebird');
var mongoose = require('mongoose');
var mongoDataModel = mongoose.model('mongodatamodel', mongoSchema);

module.exports.listFetching = function (storedData, skip, count) {
  var totalCount;
  return db.getCount(mongoDataModel, storedData)
    .then(function (counts) {
        console.log(counts);
        totalCount = counts;
        return db.getDataFromMongoDb(mongoDataModel, storedData, skip, count);
      },
      function (err) {
        return bluebird.reject(err);
      })
  .then(function (data) {
    var result = {
      count: totalCount,
      data: data
    };
    return bluebird.resolve(result);
  }, function (err) {
    return bluebird.reject(err);
  });
};
