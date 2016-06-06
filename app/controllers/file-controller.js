'use strict';

const fileService = require('../services/file-service');

exports.fileUpload = function (req, res) {
  return fileService.handleUploadedFile(req, res);
};
