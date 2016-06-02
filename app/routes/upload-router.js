var express = require('express');
var router = express.Router();
var multer = require('multer');

var fileUpload = require('../controllers/upload-file.js');
var k = require('../../config/constants.js');

var upload = multer({
  dest: k.MULTER.DESTINATION
});

router.post('/', upload.single('file'), function (req, res, next) {
  fileUpload.processFileUpload(req.file)
    .then(function (data) {
      if (data.totalNumber === data.processedNumber) {
        res.status(200).send(
          {
            responseCode: 200,
            responseMessage:'Your file uploaded successfully'
          }
        );
      } else {
        var number = data.totalNumber - data.processedNumber ;
        res.status(200).send(
          {
            responseCode: 200,
            responseMessage: 'Your file uploaded successfully with ' +
              number + ' out of ' + data.totalNumber + ' rows omited.'
          }
        );
      }
    }, function (err) {
      res.status(err.status || 500 ).send(err.message || 'Upload Failed due to some internal issues.');
    });
});

module.exports = router;
