var path = require('path');

exports.fileExtension = function getExtension(filename) {
  var ext = path.extname(filename || '').split('.');
  return ext[ext.length - 1];
};
