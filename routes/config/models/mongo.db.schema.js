var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var mongodbData = new Schema({
  originalSheetName: {
    type: String
  },
  sheetListName: {
    type: String
  },
  categoryID: {
    type: String
  },
  category: {
    type: String
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongodbData;
