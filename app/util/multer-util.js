'use strict';

const multer = require('multer');
const k = require('../../config/constants');

var fileName;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, k.UPLOADS_FOLDER);
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + k.XLSX_FILE_EXT;
    cb(null, fileName);
  }
});
var upload = multer({
  storage: storage
});

module.exports = {
  upload: upload
};
