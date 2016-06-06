'use strict';

const fileController = require('../controllers/file-controller');
const router = require('express').Router();
const multerSetup = require('../util/multer-util');

router.post('/file', multerSetup.upload.single('input'),
  fileController.fileUpload);

module.exports = router;
