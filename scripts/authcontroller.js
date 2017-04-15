angular.module('SE_App').controller('loginController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q','$auth','$state',
    function ($mdDialog,$scope, $mdEditDialog, $http,$mdToast,$q,$auth,$state) {
  'use strict';

  $scope.login = function($uuser){
			$scope.busy = true;
			$auth.login($uuser)
			.then(function(response) {
        if(response.data == "Need Verification"){
                          $mdDialog.show({
                          clickOutsideToClose: true,
                          controller: 'authyVerify',
                          controllerAs: 'authyCtrl',
                          focusOnOpen: false,
                          templateUrl: 'partials/authyVerify.html',
                          scope: $scope,
                          resolve: {
                               $user: function () {
                                 return $uuser;
                               }
                             }
                          })
                    } else {
                      $mdToast.show({
                        hideDelay   : 4000,
                        position    : 'top center',
                        controller  : 'ToastCtrl',
                        templateUrl : '/partials/toast-template.html',
                        toastClass  : 'toastSuccess',
                        resolve: {
                             $response: function () {
                               return 'Successfully Logged In';
                             }
                           }
                        });
        }
				$state.go('home.domains');
			})
			.catch(function(response) {
				$scope.busy = false;
        $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastDanger',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
			});
    }
    $scope.forgotPassword = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'forgotPasswordController',
        controllerAs: 'fgpCtrl',
        focusOnOpen: false,
        targetEvent: event,
        templateUrl: 'partials/forgotPassword.html',
      })
      // .then($scope.getChangeLog);
    };

    $scope.signUp = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'signupController',
        controllerAs: 'sUpCtrl',
        focusOnOpen: false,
        targetEvent: event,
        templateUrl: 'partials/signup.html',
      })
      // .then($scope.getChangeLog);
    };
}]);

angular.module('SE_App').controller('signupController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q',
    function ($mdDialog,$scope, $mdEditDialog, $http,$mdToast,$q) {
  'use strict';

  function stripeResponse(response) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'stripeResponseController',
      controllerAs: 'respCtrl',
      focusOnOpen: false,
      templateUrl: 'partials/stripeResponse.html',
      resolve: {
           $response: function () {
             return response;
           }
         }
    })
    // .then($scope.getChangeLog);
  };

  this.register = function(token){

      // $scope.busy = true;
      $scope.register.form.$setSubmitted();
      if($scope.register.form.$valid) {
      $http.post('/service/signup/',{signUp: $scope.signUp,$token: token}).then(function(response){

        stripeResponse(response);
    })

      .catch(function(response) {

        $mdToast.show({
        hideDelay   : 9000,
        position    : 'top center',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        toastClass  : 'toastWarning',
        resolve: {
             $response: function () {
               return response.data;
             }
           }
        });
      });

    }
  }

    function success(signUp) {
      $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
      $mdDialog.hide(software_keys_table);
    }

      function fedup(response){
    	//console.log('FAILED!',data);
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
      }
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

}]);


  angular.module('SE_App').controller('ToastCtrl', ['$mdDialog','$scope','$mdToast','$response',
      function ($mdDialog, $scope, $mdToast,$response) {
        $scope.response = $response;
        $scope.closeToast = function() {
                $mdToast
                  .hide()
              };
    }]);

    angular.module('SE_App').controller('stripeResponseController', ['$mdDialog', '$scope', '$mdEditDialog', '$http','$mdToast',
    '$q', '$response',
    function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast,$q,$response) {
      'use strict';

      $scope.response = $response.data;

      $scope.hide = function() {
        $mdDialog.hide();
      };

      this.cancel = function() {
        $mdDialog.cancel();
      };

    }]);



    angular.module('SE_App').controller('authy', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
    function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast) {
      'use strict';

      this.cancel = function() {
        $mdDialog.cancel();
      };

}]);
