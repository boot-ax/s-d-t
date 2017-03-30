angular.module('reset_App', ['ngMaterial','ngSanitize','angular-loading-bar','ngPassword'])
  .config(['$mdThemingProvider','cfpLoadingBarProvider' ,'$mdAriaProvider','$locationProvider',function ($mdThemingProvider,cfpLoadingBarProvider,$mdAriaProvider,$locationProvider) {
    'use strict';
    // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

    // $mdAriaProvider.disableWarnings();
    $mdAriaProvider.disableWarnings();
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('deep-purple');

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
  }])

  .controller('password-resetController', ['$mdDialog','$scope', '$http','$mdToast',
  '$q','$window',
  function ($mdDialog,$scope, $http,$mdToast,$q,$window) {
    'use strict';

    $scope.passwordReset = function($user){

      // $user.reset = "true";
  			// $scope.busy = true;
  			      $http.post('/service/password-reset',{user: $user}).then(function(response){
                $mdToast.show(
                    $mdToast.simple()
                      .textContent(response.data)
                      .hideDelay(3000)
                  ).then(function(){
                    $window.location.href = '/index.html';
                  });

            })
  			.catch(function(response) {
  				// $scope.busy = false;
  				$mdToast.show($mdToast.simple().textContent(response.data).hideDelay(6000));
  			});
      }

$scope.cancel = function() {
  $window.location.href = '/index.html';
}

  }]);
