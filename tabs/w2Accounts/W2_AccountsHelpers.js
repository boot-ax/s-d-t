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
    $mdToast.show(
        $mdToast.simple()
          .textContent('Successfully Deleted')
          .hideDelay(3000)
      );
    }

  function error(response) {
    $mdToast.show(
        $mdToast.simple()
          .textContent(response.data)
          .hideDelay(3000)
      );
    }
    this.authorizeUser = function () {
      $q.all(W2_accounts_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
