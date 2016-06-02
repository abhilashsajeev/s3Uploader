'use strict';

var aws = require('aws-sdk');

module.exports = {
  AWSCONSTANTS: {
    s3ForcePathStyle: true,
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    endpoint: new aws.Endpoint('http://localhost:4567'),
    sslEnabled: false
  }
};
