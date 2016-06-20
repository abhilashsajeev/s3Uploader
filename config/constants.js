'use strict';

var aws = require('aws-sdk');

module.exports = {
  AWSCONSTANTS: {
    s3ForcePathStyle: true,
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    endpoint: new aws.Endpoint('http://10.4.3.52:4567'),
    sslEnabled: false
  },
  UPLOAD_FOLDER_PATH: './uploads/',
  DB_COLLECTION_NAME: 'fileUpload',
  AWS_BUCKET_NAME: 'uploadedFile',
  CATEGORY_ID: 'categoryId',
  CATEGORY: 'Category',
  CATEGORYID: 'Category ID ',
  META_TITLE: 'Meta Title',
  META_DESCRIPTION: 'Meta Description',
  HEADERS: ['Category ID ', 'Category', 'Meta Title', 'Meta Description'],
  AWS_LINK: 'http://10.4.3.52:4567/uploadedFile/'
};
