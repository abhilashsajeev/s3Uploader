'use strict';

var s3uploader = angular.module('s3Uploader', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/file-upload/file-upload.html',
        controller: 'fileSelection as fileupCtrl'
      })
      .state('list', {
        url: '/list',
        templateUrl: '/file-list/file-list.html',
        controller: 'fileListingController as filelistCtrl'
      });
  }]);
