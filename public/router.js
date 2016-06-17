'use strict';

var s3uploader = angular.module('s3Uploader', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/file-upload/file-upload.html',
        controller: 'fileSelection as fileupCtrl'
      });
  }]);
