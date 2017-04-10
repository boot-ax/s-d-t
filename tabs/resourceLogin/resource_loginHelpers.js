angular.module('SE_App').factory('$resource_login', ['$resource', function ($resource) {
  'use strict';

  return {
    resource_login_tables: $resource('/service/resource_login')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addResource_loginController', ['$mdDialog', '$resource_login', '$scope' , '$http', 'ngToast',function ($mdDialog, $resource_login, $scope, $http,ngToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(resource_login_table) {
    ngToast.create({
      className: 'success',
      content: 'New Content Added',
      dismissButton: 'true'
      });
    $mdDialog.hide(resource_login_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    ngToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $resource_login.resource_login_tables.save({resource_login_table: $scope.resource_login_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteResource_loginController', ['$authorize', 'resource_login_tables', '$mdDialog', '$resource_login', '$scope', '$q', 'ngToast',function ($authorize, resource_login_tables, $mdDialog, $resource_login, $scope, $q,ngToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(resource_login_table, index) {
    var deferred = $resource_login.resource_login_tables.remove({id: resource_login_table.resource_url_ID}, success, error);


    deferred.$promise.then(function () {
      resource_login_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    ngToast.create({
      className: 'success',
      content: 'Successfully Deleted',
      dismissButton: 'true'
      });
    }

  function error(response) {
    ngToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
    }
    this.authorizeUser = function () {
      $q.all(resource_login_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
