// Contains all constants

'use strict';

module.exports = {
  // AWS constants
  ACCESS_KEY_ID_KEY: 'ACCESS_KEY_ID',
  AWS_ENDPOINT: 'http://localhost:7007',
  SECRET_ACCESS_KEY: 'SECRET_ACCESS_KEY',
  S3_BUCKET_NAME: 'S3UPLOADERBUCKET',

  // Json Object keys
  CATEGORY_ID_KEY: 'Category ID ',
  CATEGORY_KEY: 'Category',
  META_DESCRIPTION_KEY: 'Meta-Description',
  META_TITLE_KEY: 'Meta-Title',

  // MongoDB 
  MONGODB_URL: 'mongodb://localhost:27017/s3uploader',
  TABLE_NAME: 'S3DataTable',
  
  // Paths
  UPLOADS_FOLDER: 'public/uploads',
  
  // Extensions
  JSON_FILE_EXT: '.json',
  XLSX_FILE_EXT: '.xlsx'
  
};
