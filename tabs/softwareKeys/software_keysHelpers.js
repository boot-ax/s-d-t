angular.module('SE_App').factory('$software_keys', ['$resource', function ($resource) {
  'use strict';

  return {
    software_keys_tables: $resource('/service/software_keys')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addSoftware_keysController', ['$mdDialog', '$software_keys', '$scope' , '$http', '$mdToast','$auth',function ($mdDialog, $software_keys, $scope, $http,$mdToast,$auth) {
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

  function success(software_keys_table) {
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

  this.addItem = function () {
    $scope.software_keys_table.user_email =  payload.user_email;
    $scope.software_keys_table.user_security = payload.user_security;
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $software_keys.software_keys_tables.save({software_keys_table: $scope.software_keys_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteSoftware_keysController', ['$authorize', 'software_keys_tables', '$mdDialog', '$software_keys', '$scope', '$q', function ($authorize, software_keys_tables, $mdDialog, $software_keys, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(software_keys_table, index) {
    var deferred = $software_keys.software_keys_tables.remove({id: software_keys_table.software_keys_ID});

    deferred.$promise.then(function () {
      software_keys_tables.splice(index, 1);
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
    $q.all(software_keys_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);
