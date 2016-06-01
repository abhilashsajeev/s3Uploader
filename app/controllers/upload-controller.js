'use strict';
var multer = require('multer');
var bluebird = require('bluebird');

function upload (req) {
	console.log('In uploadCrl');
  var fileTimeStamp;
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.xlsx');
  }
  });
  var uploadData = bluebird.promisify(multer({ storage: storage }).single('upload'));
  return uploadData(req, function(uploadError) {
    if (uploadError) {
      return Promise.reject(new XError(err.g.input).hr('Error in uploaded file'));
    } else {
      return Promise.resolve();
    }
  }).then(function() {
    return 'success';
  }).catch(function(e){
    return Promise.reject(e);
  });
}

module.exports = {
	upload: upload
};
