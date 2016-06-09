'use strict';

const xlsx = require('xlsx');
const bluebird = require('bluebird');
const k = require('../../config/constants');
const aws = require('aws-sdk');
const mongoService = require('./mongodb-data-upload-service');

function handleUploadedFile(req, res) {
  if (req.file) {
    parseFile(res, req.file.filename);
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
}

function parseFile(res, fileName) {
  var workbook = xlsx.readFile(k.UPLOADS_FOLDER + '/' + fileName);
  var worksheets = [];
  var sheetJSON = [];
  var sheetNameList = workbook.SheetNames;
  var i = 0;
  sheetNameList.forEach(function (y) {
    worksheets[i] = workbook.Sheets[y];
    sheetJSON[i] = xlsx.utils.sheet_to_json(worksheets[i]);
    return bluebird.each(sheetJSON[i], function (jsonObject) {
      if (jsonObject[k.CATEGORY_ID_KEY] && jsonObject[k.CATEGORY_KEY]) {
        mongoService.writeJsonDataToDb(jsonObject);
        var s3FilePath = (jsonObject[k.CATEGORY_KEY].replace(/\s>\s/g, '/')) + '/' +
          jsonObject[k.CATEGORY_ID_KEY] + k.JSON_FILE_EXT;
        delete jsonObject[k.CATEGORY_KEY];
        delete jsonObject[k.CATEGORY_ID_KEY];
        var stringifiedJSON = JSON.stringify(jsonObject);

        s3Handling(s3FilePath, stringifiedJSON);
      }
    });
    i = i + 1;
  });
}

function s3Handling(s3FilePath, stringifiedJSON) {
  var config = {
    s3ForcePathStyle: true,
    accessKeyId: k.ACCESS_KEY_ID_KEY,
    secretAccessKey: k.SECRET_ACCESS_KEY,
    endpoint: new aws.Endpoint(k.AWS_ENDPOINT),
    sslEnabled: false
  };
  var client = new aws.S3(config);
  var params = {
    Bucket: k.S3_BUCKET_NAME,
    Key: s3FilePath,
    Body: stringifiedJSON
  };
  client.upload(params, function uploadCallback(err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  handleUploadedFile: handleUploadedFile
};
