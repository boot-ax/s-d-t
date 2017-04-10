angular.module('reset_App', ['ngMaterial','ngSanitize','angular-loading-bar','ngPassword','ngToast'])
  .config(['$mdThemingProvider','cfpLoadingBarProvider' ,'$mdAriaProvider','$locationProvider','ngToastProvider',function ($mdThemingProvider,cfpLoadingBarProvider,$mdAriaProvider,$locationProvider,ngToast) {
    'use strict';
    // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

    // $mdAriaProvider.disableWarnings();
    $mdAriaProvider.disableWarnings();
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('deep-purple');

      ngToast.configure({
    horizontalPosition: 'center',
    animation: 'fade',
                combineDuplications: true,
  });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
  }])

  .controller('password-resetController', ['$mdDialog','$scope', '$http','ngToast','$q','$window',
  function ($mdDialog,$scope, $http,ngToast,$q,$window) {
    'use strict';



    $scope.passwordReset = function(userl,token){

      var success = function(response){
        ngToast.create({
          className: 'success toasthome',
          content: response.data,
          dismissButton: 'true',
          timeout: 3800
        });
        setTimeout(function(){
    $window.location.href = '/index.html';
  }, 4000);
      }

      userl.token = token;
      // $user.reset = "true";
  			// $scope.busy = true;
  			      $http.post('/service/password-reset',{user: userl}).then(function(response){

                  success(response);
                })


  			.catch(function(response) {
  				// $scope.busy = false;
          ngToast.create({
            className: 'danger toasthome',
            content: response.data,
            dismissButton: 'true',
            timeout: 9000
            });
  			});
      }

$scope.cancel = function() {
  $window.location.href = '/index.html';
}

  }]);
