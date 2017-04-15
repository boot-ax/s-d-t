angular.module('SE_App').controller('authyVerify', ['$mdDialog','$scope', '$http','$user','$auth','$state','$mdToast',
function ($mdDialog, $scope, $http,$user,$auth,$state,$mdToast) {
  'use strict';
  $scope.authyVerify = function($authy){
    $user['authy'] = $authy.code;
     console.log($user);
    $scope.authy.form.$setSubmitted();

    $auth.login($user).then(function(response){
          $mdToast.show({
          hideDelay   : 4000,
          position    : 'top center',
          controller  : 'ToastCtrl',
          templateUrl : '/partials/toast-template.html',
          toastClass  : 'toastSuccess',
          resolve: {
               $response: function () {
                 return 'Successfully Verifed and Logged In';
               }
             }
          });
        $mdDialog.hide();
        $state.go('home.domains');
  }).catch(function(response) {
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
  this.cancel = function() {
    $mdDialog.cancel();
  };

}]);
