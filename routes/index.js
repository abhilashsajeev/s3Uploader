'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({
	dest: 'uploads/'
});

/* GET home page. */
router.post('/api/upload',upload.single('file'), function (req, res, next) {
  console.log(req.file.path);
  fs.readFile(req.file.path, function(err, contents) {
    console.log(contents);
});
});

module.exports = router;
