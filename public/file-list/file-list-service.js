'use strict';
s3uploader.service('fileList', ['$http', function ($http) {
  this.getListFromServer = function (listUrl, pageCount, sheetName, successCallback, failureCallback) {
    $http.get(listUrl, {
        params: {
          sheet: sheetName,
          count: pageCount
        }
      })
      .success(function (data) {
        successCallback(data);
      })
      .error(function (err) {
        failureCallback(err);
      });
  };

  this.updateToServer = function (data, updateUrl, successCallback, failureCallback) {
    $http.post(updateUrl, data, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .success(function (data) {
        successCallback(data);
      })
      .error(function (err) {
        failureCallback();
      });
  };

  this.getSheets = function (sheetsUrl, successCallback, failureCallback) {
    $http.get(sheetsUrl)
      .success(function (data) {
        successCallback(data);
      })
      .error(function (err) {
        failureCallback(err);
      });
  };
}]);
