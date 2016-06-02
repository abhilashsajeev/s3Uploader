'use strict';
var aws = require('aws-sdk');

function s3Handling(s3FilePath, stringifiedJSON) {
  var config = {
    s3ForcePathStyle: true,
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    endpoint: new aws.Endpoint('http://localhost:7007'),
    sslEnabled:false
  };
  var client = new aws.S3(config);
  var params = {
    Bucket: 'SampleBucket',
  };
  params.Key = s3FilePath;
  params.Body = stringifiedJSON;
  client.upload(params, function uploadCallback (err, data) { // upload to S3
    if (err) {
      console.log(err, data);
    }
  });
}

module.exports = {
  s3Handling: s3Handling
};
