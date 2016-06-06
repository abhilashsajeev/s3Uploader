'use strict';

const mongoose = require('mongoose');
const mongodbModel = require('../models/s3-uploader-db-schema');
const k = require('../../config/constants');

const db = mongoose.connection;
var s3UploaderDbSchema;
var s3UploaderDbModel;

db.on('error', console.error.bind(console, 'DB Connection eroor:'));
db.once('open', function () {
  s3UploaderDbSchema = mongodbModel.s3UploaderDbSchema;

  s3UploaderDbModel = mongoose.model(k.TABLE_NAME, s3UploaderDbSchema);
}, {
  timestamp: true
});

mongoose.connect(k.MONGODB_URL);

function writeJsonDataToDb(jsonObject) {
  var tableObject = new s3UploaderDbModel({
    category: jsonObject[k.CATEGORY_KEY],
    categoryId: jsonObject[k.CATEGORY_ID_KEY],
    metaTitle: jsonObject[k.META_TITLE_KEY],
    metaDescription: jsonObject[k.META_DESCRIPTION_KEY]
  });
  tableObject.save(function (err) {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  writeJsonDataToDb: writeJsonDataToDb
};
