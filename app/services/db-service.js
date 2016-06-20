'use strict';

var mongoose = require('mongoose');
var bluebird = require('bluebird');
var s3DbSchema = require('../../config/models/s3-db-schema');
var config = require('../../config/config');
var k = require('../../config/constants');
var _ = require('lodash');

var s3Model;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function () {
  // create model
  s3Model = mongoose.model(k.DB_COLLECTION_NAME, s3DbSchema);
}, {
  timestamps: true
});

mongoose.connect(config.url);

module.exports.writeToDatabase = function (jsonObject) {
  var assignedObject = _.assign({}, {
    category: jsonObject.Category,
    categoryId: jsonObject[k.CATEGORYID],
    metaDescription: jsonObject[k.META_DESCRIPTION],
    metaTitle: jsonObject[k.META_TITLE],
    sheetName: jsonObject.sheetName,
    awsLink: jsonObject.awsLink
  });

  return s3Model.findOneAndUpdate({
      categoryId: assignedObject.categoryId,
      category: assignedObject.category,
      sheetName: assignedObject.sheetName
    }, assignedObject, {
      upsert: true
    })
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports.updateMongoDb = function (id, jsonObject) {
  return s3Model.findByIdAndUpdate(id, {
      $set: {
        metaTitle: jsonObject.metaTitle,
        metaDescription: jsonObject.metaDescription
      }
    }, {
      new: true
    })
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject('err');
    });
};

module.exports.getDataFromMongoDb = function (sheetName, count) {
  var param = {};
  if (sheetName) {
    param = {
      sheetName: sheetName
    };
  }
  var limit;
  limit = (count - 1) * 10;
  return s3Model.find(param).skip(limit).limit(10)
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject('err');
    });
};

module.exports.getCount = function (sheetName) {
  return s3Model.count({
      sheetName: sheetName
    })
    .then(function (countOfObject) {
      return countOfObject;
    });
};

module.exports.getSheetNames = function () {
  return s3Model.find({}, {
      sheetName: 1
    })
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject('err');
    });
};
