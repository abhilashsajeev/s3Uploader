'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jsonObjectSchema = new Schema({
  categoryID: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  }
});

var jsonFileSchema = new Schema({
  documentName: {
    type: String,
    required: true
  },
  sheetName: {
    type: String,
    required: true
  },
  jsonObject: jsonObjectSchema
}, {
  timestamps: true
});

var JsonFiles = mongoose.model('JsonFile', jsonFileSchema);

module.exports = JsonFiles;
