angular.module('SE_App').factory('$W2_accounts', ['$resource', function ($resource) {
  'use strict';

  return {
    W2_accounts_tables: $resource('/service/W2_accounts')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addW2_AccountsController', ['$mdDialog', '$W2_accounts', '$scope' , '$http','$mdToast',function ($mdDialog, $W2_accounts, $scope, $http,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(W2_accounts_table) {
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
    $mdDialog.hide(W2_accounts_table);
  }

    function fedup(response){
      $mdToast.show({
      hideDelay   : 9000,
      position    : 'top left',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      resolve: {
           $response: function () {
             return response;
           }
         }
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $W2_accounts.W2_accounts_tables.save({W2_accounts_table: $scope.W2_accounts_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteW2_AccountsController', ['W2_accounts_tables', '$mdDialog', '$W2_accounts', '$scope', '$q', '$mdToast',function (W2_accounts_tables, $mdDialog, $W2_accounts, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(W2_accounts_table, index) {
    var deferred = $W2_accounts.W2_accounts_tables.remove({id: W2_accounts_table.W2_ID}, success, error);

    deferred.$promise.then(function () {
      W2_accounts_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
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
    this.authorizeUser = function () {
      $q.all(W2_accounts_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
