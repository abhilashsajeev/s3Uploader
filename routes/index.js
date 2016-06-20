var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploadCntrlr = require('./controller/upload.controller.js');
var listingData = require('./controller/listing.controller.js');
var listingRegion = require('./controller/regionlisting.controller.js');
var updatingData = require('./controller/updating.controller.js');
var uploadFolder = require('./config/constants.js').UPLOAD_FOLDER;
var path = require('path');
var fs = require('fs');

var upload = multer({
  dest: uploadFolder
});
/* GET home page. */
router.post('/uploadfile', upload.single('file'), uploadCntrlr.uploadFile);
router.get('/list', listingData.listFetch);
router.get('/list-region', listingRegion.regionNames);
router.post('/update', updatingData.updatemongo);
router.get('*', function (req, res, next) {
  fs.createReadStream(path.resolve('./public/index.html')).pipe(res);
});


module.exports = router;
