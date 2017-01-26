angular.module('SE_App').factory('$W2_accounts', ['$resource', function ($resource) {
  'use strict';

  return {
    W2_accounts_tables: $resource('/service/W2_accounts')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addW2_AccountsController', ['$mdDialog', '$W2_accounts', '$scope' , '$http','$mdToast', function ($mdDialog, $W2_accounts, $scope, $http,$mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(W2_accounts_table) {
    $mdToast.show(
        $mdToast.simple()
          .textContent('New Content Added')
          .hideDelay(3000)
      );
    $mdDialog.hide(W2_accounts_table);
  }

    function fedup(data){
  	//console.log('FAILED!',data);
	$mdToast.show(
      $mdToast.simple()
        .textContent(data.data)
        .hideDelay(3000)
    );
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $W2_accounts.W2_accounts_tables.save({W2_accounts_table: $scope.W2_accounts_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteW2_AccountsController', ['$authorize', 'W2_accounts_tables', '$mdDialog', '$W2_accounts', '$scope', '$q', function ($authorize, W2_accounts_tables, $mdDialog, $W2_accounts, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(W2_accounts_table, index) {
    var deferred = $W2_accounts.W2_accounts_tables.remove({id: W2_accounts_table.W2_ID});

    deferred.$promise.then(function () {
      W2_accounts_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function error() {
    $scope.error = 'Invalid secret.';
  }

  function success() {
    $q.all(W2_accounts_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);
