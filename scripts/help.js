angular.module('SE_App').controller('helpController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q','$location','$auth',
function ($mdDialog,$scope, $mdEditDialog, $http,$mdToast,$q,$location,$auth) {
  'use strict';

  $scope.payload = JSON.parse($auth.getPayload().sub);

  $scope.logout = function(){
     $auth.logout();
  $location.path('/login');
  };

  $scope.userSettings = function(){
  $location.path('/profile');
  };

  $scope.homePage = function(){
  $location.path('/domains');
  };


}]);
