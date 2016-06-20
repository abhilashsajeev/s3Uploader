var AWS = require('aws-sdk');
var _ = require('lodash');
var bluebird = require('bluebird');
var awsConstants = require('../config/constants').AWSCONSTANTS;
var bucketName = require('../config/constants.js').AWS_BUCKET_NAME;

AWS.config.setPromisesDependency(bluebird);
var awsUpdate = function (newJson) {
  var client = new AWS.S3(awsConstants);
  var params = {
    Bucket: bucketName
  };
  var newPath = newJson.sheetListName + '/' + (newJson.category).replace(/\s>\s|>\s/g, '/') + '/' + newJson.categoryID +
    '.json';
  newPath = newPath.replace(/\s/g, '_');
  newJson = _.pick(newJson, ['metaTitle', 'metaDescription']);
  var stringifiedJson = JSON.stringify(newJson);
  params.Key = newPath;
  params.Body = stringifiedJson;
  var updateObjectPromise = client.putObject(params).promise();
  return updateObjectPromise
    .then(function (data) {
      return data;
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports = {
  awsUpdate: awsUpdate
};
