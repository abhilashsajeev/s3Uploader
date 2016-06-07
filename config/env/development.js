'use strict';

module.exports = {
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/s3_database',
  port: process.env.PORT || 4001
};
