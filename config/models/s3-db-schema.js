'use strict';

var mongoose = require('mongoose');

var s3DbSchema = new mongoose.Schema({
  sheetName: String,
  category: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  metaTitle: String,
  metaDescription: String,
  awsLink: String
},{
  timestamps:true
});

module.exports = s3DbSchema;
