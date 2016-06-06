'use strict';

const mongoose = require('mongoose');

const s3UploaderDbSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  metaTitle: String,
  metaDescription: String
});

module.exports = {
  s3UploaderDbSchema: s3UploaderDbSchema
};
