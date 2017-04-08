
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
        $mdToast.show(
            $mdToast.simple()
              .textContent('Successfully Loged In')
              .hideDelay(3000)
          );
        }
				$state.go('home.domains');
			})
			.catch(function(response) {
				$scope.busy = false;
				$mdToast.show($mdToast.simple().textContent(response.data).hideDelay(6000));
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

        $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(6000));
      });

    }
  }

    function success(signUp) {
      $mdToast.show(
          $mdToast.simple()
            .textContent('New Content Added')
            .hideDelay(3000)
        );
      $mdDialog.hide(software_keys_table);
    }

      function fedup(data){
    	//console.log('FAILED!',data);
  	$mdToast.show(
        $mdToast.simple()
          .textContent(data.data)
          .hideDelay(3000)
      );
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


angular.module('SE_App').controller('deleteAccountController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
'$q',
    function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast,$q) {
  'use strict';

  this.cancelAccount = function(){
    $http.post('/service/delete-account/').then(function(response){
      $mdToast.show({
        hideDelay   : 9000,
        position    : 'bottom left',
        controller  : 'ToastCtrl',
        templateUrl : '/partials/toast-template.html',
        resolve: {
             $response: function () {
               return response;
           }
         }
      });
        $mdDialog.hide();
  });
  }

        this.cancel = $mdDialog.cancel;

}]);



  angular.module('SE_App').controller('forgotPasswordController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
  function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast) {
    'use strict';

    $scope.resetPassword = function($user){
      $scope.forgotPassword.form.$setSubmitted();
      $http.post('/service/password-reset/',{user: $user}).then(function(response){
        $mdToast.show(
            $mdToast.simple()
              .textContent(response.data)
              .hideDelay(3000)
          );
          $mdDialog.hide();
    }).catch(function(response) {
      $scope.busy = false;
      $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(6000));
    });
    }


    this.cancel = function() {
      $mdDialog.cancel();
    };

  }]);

  angular.module('SE_App').controller('profileChangeController', ['$mdDialog','$scope', '$mdEditDialog', '$http','$mdToast',
  '$q', '$profile',
      function ($mdDialog, $scope, $mdEditDialog, $http,$mdToast,$q,$profile) {
        'use strict';
        this.profileChange2 = function(){
          $http.post('/service/newprofileinfo/',{newProfile: $profile})
          .then(function(response){
        success(response);},
        function(response){
        failure(response);
      });
      };

    var failure  = function (response) {
                    console.error("Login error: ", response.data);
                    alert("Error with profile change or two factor turn on.  Check console");
    };

    var success  = function(response){
      if(response.data == "Verification"){
                              $mdDialog.show({
                        clickOutsideToClose: true,
                        controller: 'authy',
                        controllerAs: 'authyCtrl',
                        focusOnOpen: false,
                        templateUrl: 'partials/authy.html',
                        })
                  } else {
        $mdToast.show(
            $mdToast.simple()
              .textContent(response.data)
              .hideDelay(3000)
          );
        }
          $mdDialog.hide();
    };

    this.cancel = $mdDialog.cancel;


  }]);



  angular.module('SE_App').controller('ToastCtrl', ['$mdDialog','$scope','$mdToast','$response',
      function ($mdDialog, $scope, $mdToast,$response) {
        $scope.response = $response.data;
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
