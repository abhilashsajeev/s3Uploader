'use strict';
var mongoose = require('mongoose');
var s3SchemasModel = require('../models/s3-schema.js');

var s3TableSchema;
var s3Model;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function() {
  console.log('db.once successful');

  // create schema
  s3TableSchema = s3SchemasModel.S3TableSchema();
  // create model
  s3Model = mongoose.model('S3FileTable', s3TableSchema);
},{
  timestamp: true
});

mongoose.connect('mongodb://localhost/test');

function writeJSONToDB(jsonObject) {
  var tableObject = new s3Model({
    category: jsonObject.Category,
    categoryID: jsonObject['Category ID '],
    metaTitle: jsonObject['Meta Title'],
    metaDescription: jsonObject['Meta Description']
  });
  tableObject.save(function(err){
    if (err) {
      return console.error(err);
    }
  });
}

module.exports = {
  writeJSONToDB: writeJSONToDB
};
