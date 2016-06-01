'use strict';

module.exports = {
  AWS: {
    BUCKET_NAME: 'my_bucket',
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY || 'ACCESS_KEY_ID',
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY',
    ENDPOINT: process.env.AWS_ENDPOINT || 'http://localhost:4567'
  },
  DB: {
    URL: 'mongodb://' + (process.env.DB_ADDRESS || 'localhost') + ':' + (process.env.DB_PORT || '27017') + '/' + (
      process.env.DB_NAME || 'json_database')
  },
  MULTER: {
    DESTINATION: 'uploads/'
  },
  EXCEL_HEADER: {
    CATEGORY: 'Category',
    CATEGORY_ID: 'Category ID ',
    META_TITLE: 'Meta Title',
    META_DESCRIPTION: 'Meta Description'
  },
  HOME_HTML_PATH: '/../../public/home.html'
};
