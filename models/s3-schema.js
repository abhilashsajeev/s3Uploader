'use strict';

var mongoose = require('mongoose');

var S3TableSchema = function(){
  return mongoose.Schema({
    category: {
      type: String,
      required: true
    },
    categoryID: {
      type: String,
      required: true
    },
    metaTitle: String,
    metaDescription: String
  });
};

module.exports = {
  S3TableSchema: S3TableSchema
}; 
