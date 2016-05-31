'use strict';

var k = require('../config/constants.js');
var AWS = require('aws-sdk');

var config = {
  s3ForcePathStyle: true,
  accessKeyId: k.AWS.ACCESS_KEY_ID,
  secretAccessKey: k.AWS.SECRET_ACCESS_KEY,
  endpoint: new AWS.Endpoint(k.AWS.ENDPOINT)
};
var client = new AWS.S3(config);

module.exports = function (jsonObj, jsonFilePath) {
  var params = {
    Bucket: k.AWS.BUCKET_NAME
  };
  params.Key = jsonFilePath;
  params.Body = JSON.stringify(jsonObj);
  return client.putObject(params).promise()
    .then(function (data) {
      // Uploading done.
    })
    .catch(function (err) {
      console.error(err);
    });
};
