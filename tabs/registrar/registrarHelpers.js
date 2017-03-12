angular.module('SE_App').factory('$registrar', ['$resource', function ($resource) {
  'use strict';

  return {
    registrar_tables: $resource('/service/registrar')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addRegistrarController', ['$mdDialog', '$registrar', '$scope' , '$http', '$mdToast', '$auth',function ($mdDialog, $registrar, $scope, $http, $mdToast,$auth) {
  'use strict';
  var payload = JSON.parse($auth.getPayload().sub);
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(registrar_table) {
    $mdToast.show(
        $mdToast.simple()
          .textContent('New Content Added')
          .hideDelay(3000)
      );
    $mdDialog.hide(registrar_table);
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
    $scope.registrar_table.user_email =  payload.user_email;
    $scope.registrar_table.user_security = payload.user_security;
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $registrar.registrar_tables.save({registrar_table: $scope.registrar_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteRegistrarController', ['$authorize', 'registrar_tables', '$mdDialog', '$registrar', '$scope', '$q', function ($authorize, registrar_tables, $mdDialog, $registrar, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(registrar_table, index) {
    var deferred = $registrar.registrar_tables.remove({id: registrar_table.registrar_ID});

    deferred.$promise.then(function () {
      registrar_tables.splice(index, 1);
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
    $q.all(registrar_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);
