'use strict';
s3uploader.controller('fileSelection', ['$scope', 'fileUpload', '$document', function ($scope, fileUpload,
  $document) {
  $scope.alertShow = false;
  $scope.errorAlertShow = false;
  $scope.progressShow = false;
  $scope.validationErrorAlertShow = false;

  $scope.clearInput = function () {
    $document.find('input').val(null);
    $scope.myFile = null;
  };

  $scope.uploadFile = function () {
    $scope.progressShow = true;

    var callback = function (data) {
      $scope.uploadStatus = data;
      $scope.progressShow = false;
      $scope.alertShow = true;
      setTimeout(function () {
        $scope.alertShow = false;
        $scope.$apply();
      }, 5000);
    };

    var errorCallback = function () {
      $scope.progressShow = false;
      $scope.errorAlertShow = true;
      setTimeout(function () {
        $scope.errorAlertShow = false;
        $scope.$apply();
      }, 5000);
    };

    var validationErrorCallback = function () {
      $scope.progressShow = false;
      $scope.validationErrorAlertShow = true;
      setTimeout(function () {
        $scope.validationErrorAlertShow = false;
        $scope.$apply();
      }, 5000);
    };

    var file = $scope.myFile;
    $scope.clearInput();
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(file.name)[1];
    if (file && (ext === 'xlsx')) {
      var uploadUrl = '/api/upload';
      fileUpload.uploadFileToUrl(file, uploadUrl, callback, errorCallback, validationErrorCallback);
    } else {
      validationErrorCallback();
    }
  };
}]);
