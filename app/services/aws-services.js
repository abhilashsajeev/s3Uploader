'use strict';

var bluebird = require('bluebird');
var aws = require('aws-sdk');
var k = require('../../config/constants');

aws.config.setPromisesDependency(bluebird);

module.exports.upload = function (filePath, file) {
  var client = new aws.S3(k.AWSCONSTANTS);
  var params = {
    Bucket: k.AWS_BUCKET_NAME
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
