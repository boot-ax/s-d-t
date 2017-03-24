
angular.module('SE_App').controller('loginController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q','changeCellServices','upDownloadService','$auth','$state',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,changeCellServices,upDownloadService,$auth,$state) {
  'use strict';

  $scope.login = function($user){
			$scope.busy = true;
			$auth.login($user)
			.then(function(response) {
				// $scope.busy = false;
				//var payload = $auth.getPayload();
				//if(payload.admin === true){
				$state.go('home.domains');
			})
			.catch(function(response) {
				$scope.busy = false;
				$mdToast.show($mdToast.simple().textContent(response.data).hideDelay(6000));
			});
    }




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



angular.module('SE_App').controller('signupController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q) {
  'use strict';


  // this.doCheckout = function(token){
  //   alert("Got Stripe token: " + token.id);
  // }

  // this.doCheckout = function(token,signUp) {
  //   alert("Got Stripe token: " + token.id);
  // };
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
    // console.log(token);
    // console.log($scope.signUp);


      // $scope.busy = true;
      $scope.register.form.$setSubmitted();
      if($scope.register.form.$valid) {
      $http.post('/service/signup/',{signUp: $scope.signUp,$token: token}).then(function(response){
        // $scope.busy = false;
        console.log(response);
        stripeResponse(response);
      //   success(response);
      //   deferred.resolve();
      // },function(response){
      //   failure(response);
      //   deferred.reject();
    })

      .catch(function(response) {
        // $scope.busy = false;
        console.log(response);
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

angular.module('SE_App').controller('profileController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q','$location',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,$location) {
  'use strict';

    this.register = function(signUp){
      // $scope.busy = true;
      $scope.register.form.$setSubmitted();
      if($scope.register.form.$valid) {
        console.log('Here');
        console.log(signUp);
      $http.post('/service/signup/',{signUp: signUp}).then(function(response){

      //   success(response);
      //   deferred.resolve();
      // },function(response){
      //   failure(response);
      //   deferred.reject();
    })

      // .then(function(response) {
        // $scope.busy = false;
        //var payload = $auth.getPayload();
        //if(payload.admin === true){
        // $state.go('home.domains');
      // .catch(function(response) {
      //   $scope.busy = false;
      //   console.log(response);
      //   $mdToast.show($mdToast.simple().textContent(response.data).hideDelay(3000));
      // });
      }
    }

  //   $scope.cancelAccount(){
  //
  //     // <md-button ng-click="cancelAccount()">
  //     //   <i style="color:red" class="material-icons">do_not_disturb</i>
  //     //   Cancel Account
  //     // </md-button>
  //
  // }

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
      $location.path('/domain');
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

}]);


angular.module('SE_App').controller('stripeResponseController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q', '$response',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,$response) {
  'use strict';

  $scope.response = $response.data;

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);
