angular.module('SE_App').factory('$resource_login', ['$resource', function ($resource) {
  'use strict';

  return {
    resource_login_tables: $resource('/service/resource_login')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addResource_loginController', ['$mdDialog', '$resource_login', '$scope' , '$http', '$mdToast',function ($mdDialog, $resource_login, $scope, $http,$mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(resource_login_table) {
    $mdToast.show(
        $mdToast.simple()
          .textContent('New Content Added')
          .hideDelay(3000)
      );
    $mdDialog.hide(resource_login_table);
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
      $resource_login.resource_login_tables.save({resource_login_table: $scope.resource_login_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteResource_loginController', ['$authorize', 'resource_login_tables', '$mdDialog', '$resource_login', '$scope', '$q', function ($authorize, resource_login_tables, $mdDialog, $resource_login, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(resource_login_table, index) {
    var deferred = $resource_login.resource_login_tables.remove({id: resource_login_table.resource_url_ID});

    deferred.$promise.then(function () {
      resource_login_tables.splice(index, 1);
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
    $q.all(resource_login_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);
