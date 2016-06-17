'use strict';

var myApp = angular.module('myApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/uploader/upload.html',
        controller: 'FileUploadController as fileupCtrl'
      });
  }]);
