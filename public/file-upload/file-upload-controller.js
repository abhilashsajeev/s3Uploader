'use strict';
s3uploader.controller('fileSelection', ['$scope', 'fileUpload', function ($scope, fileUpload) {
  $scope.alertShow = false;
  $scope.uploadFile = function () {
    var callback = function () {
      $scope.alertShow = true;
      setTimeout(function () {
        $scope.alertShow = false;
        $scope.$apply();
      }, 2000);
    };
    var file = $scope.myFile;
    if (file) {
      var uploadUrl = '/api/upload';
      fileUpload.uploadFileToUrl(file, uploadUrl, callback);
    }
  };
}]);
