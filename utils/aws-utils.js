'use strict';

var bluebird = require('bluebird');
var aws = require('aws-sdk');
var awsConstants = require('../config/constants').AWSCONSTANTS;

// Use bluebird implementation of Promise
aws.config.setPromisesDependency(bluebird);

module.exports.upload = function (filePath, file) {
  var client = new aws.S3(awsConstants);
  var params = {
    Bucket: 'SEOMetaData'
  };
  params.Key = filePath;
  params.Body = file;

  var uploadObjectPromise = client.putObject(params).promise();
  return uploadObjectPromise
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports.deleteBucket = function () {
  var client = new aws.S3(awsConstants);
  var params = {
    Bucket: 'SEOMetaData'
  };

  var listObjectPromise = client.listObjects(params).promise();
  return listObjectPromise
    .then(function (data) {
      var items = data.Contents;
      return bluebird.each(items, function (item) {
        params.Key = item.Key;
        return client.deleteObject(params).promise();
      });
    }, function (err) {
      bluebird.reject(err);
    }).then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};
