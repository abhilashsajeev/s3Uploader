var AWS = require('aws-sdk');
var bluebird = require('bluebird');
var awsConstants = require('../config/constants').AWSCONSTANTS;
var bucketName = require('../config/constants.js').AWS_BUCKET_NAME;

AWS.config.setPromisesDependency(bluebird);

var awsUploading = function (directoryPath, stringifiedJson) {
  var client = new AWS.S3(awsConstants);
  var params = {
    Bucket: bucketName
  };
  params.Key = directoryPath;
  params.Body = stringifiedJson;

  var uploadObjectPromise = client.putObject(params).promise();
  return uploadObjectPromise
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports = {
  awsUploading: awsUploading
};
