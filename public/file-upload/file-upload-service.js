'use strict';
s3uploader.service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function (file, uploadUrl, callback, errorCallback, validationCallback) {
    var fd = new FormData();
    fd.append('file', file);
    $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      })
      .success(function (data) {
        if (data.message === 'Invalid') {
          validationCallback();
        } else {
          callback(data);
        }
      })
      .error(function (err) {
        if (errorCallback) {
          errorCallback();
        }
      });
  };
}]);
