'use strict';

myApp.service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function (file, uploadUrl, callback) {
    var fd = new FormData();
    fd.append('file', file);
    $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      })
      .success(function (data) {
        callback();
      })
      .error(function () {});
  };
}]);
