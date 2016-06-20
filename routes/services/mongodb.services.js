var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var mongoSchema = require('../config/models/mongo.db.schema.js');
var mongoDataModel = mongoose.model('mongoDataModel', mongoSchema);

module.exports.createdb = function (mongoSchema) {
  mongoSchema.updatedAt = Date.now();
  return mongoDataModel.findOneAndUpdate({
      id: mongoSchema.mongoId
    }, mongoSchema, {
      upsert: true,
      new: true
    })
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports.updatemongoDatabase = function (id, updateJson) {
  return mongoDataModel.findByIdAndUpdate(id, {
      $set: {
        metaTitle: updateJson.metaTitle,
        metaDescription: updateJson.metaDescription
      }
    }, {
      new: true
    })
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};
module.exports.getCount = function (mongoDataModel, storedData) {
  var sheetList;
  if (storedData) {
    sheetList = {
      sheetListName: storedData
    };
  } else {
    sheetList = {};
  }
  return mongoDataModel.count(sheetList)
    .then(function (counts) {
      return counts;
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports.getDataFromMongoDb = function (mongoDataModel, storedData, skip, limit) {
  var sheetList;
  if (storedData) {
    sheetList = {
      sheetListName: storedData
    };
  } else {
    sheetList = {};
  }
  return mongoDataModel.find(sheetList).skip(skip).limit(limit)
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};
