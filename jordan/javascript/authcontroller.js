
angular.module('SE_App').controller('loginController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q','changeCellServices','upDownloadService','$auth','$state',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,changeCellServices,upDownloadService,$auth,$state) {
  'use strict';

  $scope.login = function($user){
			$scope.busy = true;
			$auth.login($user)
			.then(function(response) {
				$scope.busy = false;
				//var payload = $auth.getPayload();
				//if(payload.admin === true){
				$state.go('home.domains');
			})
			.catch(function(response) {
				$scope.busy = false;
				$mdToast.show($mdToast.simple().textContent(response.data.error).hideDelay(3000));
			});
    }

}]);



angular.module('SE_App').controller('signupController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q','changeCellServices','upDownloadService',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,changeCellServices,upDownloadService) {
  'use strict';

}]);
