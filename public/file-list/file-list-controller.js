'use strict';
s3uploader.controller('fileListingController', ['$scope', 'fileList', function ($scope, fileList) {
  var currentSheet;
  $scope.currentPage = 1;
  (function init() {
    $scope.editAlertShow = false;
    $scope.updateSuccessShow = false;
    $scope.progressShow = true;
    var sheetsUrl = '/api/list/sheets';
    var successCallback = function (data) {
      $scope.sheets = data.data;
      $scope.listData($scope.sheets[0].sheetName, $scope.currentPage);
      $scope.progressShow = false;
      $scope.selected = $scope.sheets[0];
    };
    var failureCallback = function (err) {
      $scope.progressShow = false;
    };
    fileList.getSheets(sheetsUrl, successCallback, failureCallback);
  })();

  $scope.select = function (item) {
    $scope.selected = item;
  };

  $scope.isActive = function (item) {
    return $scope.selected === item;
  };

  $scope.update = function (object) {
    object.editButton = true;
    object.saveButton = false;
    object.editingTitle = false;
    object.editingDescription = false;
    $scope.editAlertShow = false;
    var updatedObjects = {
      _id: object._id,
      metaTitle: object.textAreaMetaTitle,
      metaDescription: object.textAreaMetaDescription
    };
    var data = JSON.stringify(updatedObjects);
    var updateUrl = '/api/update';

    var successCallback = function (updateData) {
      object.metaTitle = object.textAreaMetaTitle;
      object.metaDescription = object.textAreaMetaDescription;
      $scope.updationSuccessAlert = updateData;
      $scope.updateSuccessShow = true;
      setTimeout(function () {
        $scope.updateSuccessShow = false;
        $scope.$apply();
      }, 2000);
    };

    var failureCallback = function () {
      $scope.updateFailureShow = true;
      setTimeout(function () {
        $scope.updateFailureShow = false;
        $scope.$apply();
      }, 2000);
    };
    fileList.updateToServer(data, updateUrl, successCallback, failureCallback);
  };

  $scope.listData = function (sheetName, count) {
    currentSheet = sheetName;
    $scope.tableIndex = ($scope.currentPage - 1) * 10;

    var successCallback = function (data) {
      $scope.listContent = data.data;
      $scope.totalItems = data.count;
      $scope.listContent.forEach(function (
        item) {
        item.editingTitle = false;
        item.editingDescription = false;
        item.editButton = true;
        item.saveButton = false;
        item.textAreaMetaTitle = item.metaTitle;
        item.textAreaMetaDescription = item.metaDescription;
      });
    };

    $scope.dblclickMethod = function (object) {
      object.editingTitle = false;
      object.editingDescription = false;
      object.editButton = true;
      object.saveButton = false;
      $scope.editAlertShow = false;
      object.textAreaMetaTitle = object.metaTitle;
      object.textAreaMetaDescription = object.metaDescription;
    };

    var failureCallback = function (err) {};

    var listUrl = '/api/list/data';
    fileList.getListFromServer(listUrl, count, sheetName, successCallback, failureCallback);
  };

  $scope.sheetTabs = function (sheet) {
    if (currentSheet === sheet) {} else {
      $scope.currentPage = 1;
      $scope.listData(sheet, $scope.currentPage);
    }
  };

  $scope.pageChanged = function () {
    $scope.listData(currentSheet, $scope.currentPage);
  };

  $scope.editButtonMethod = function (object) {
    object.editButton = false;
    object.saveButton = true;
    object.editingTitle = true;
    object.editingDescription = true;
    $scope.editAlertShow = true;
  };
}]);
