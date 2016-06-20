
var fileUploads = require('../services/file.export.services.js');

module.exports.uploadFile = function (req, res, err) {
  fileUploads.fileUploadFunction(req.file)
    .then(function (data) {
      res.status(200).send({
        'status': err.status,
        'message': 'File Uploaded successfully',
        'data': data
      });
    }, function (err) {
      res.status(400).send({
        'status': err.status,
        'message': err.message
      });
    });
};
