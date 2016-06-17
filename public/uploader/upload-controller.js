'use strict';

myApp.controller('FileUploadController', ['$scope', 'fileUpload', function ($scope, fileUpload) {
  $scope.fileSent = false;
  $scope.fileUpload = function () {
    var callback = function (argument) {
      $scope.fileSent = true;
      setTimeout(function () {
        $scope.fileSent = false;
        $scope.$apply();
      }, 2000);
    };
    var file = $scope.myFile;
    if (file) {
      var uploadUrl = '/fileUpload';
      fileUpload.uploadFileToUrl(file, uploadUrl, callback);
    }
  };

}]);
