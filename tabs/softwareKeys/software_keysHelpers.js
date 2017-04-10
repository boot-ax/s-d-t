angular.module('SE_App').factory('$software_keys', ['$resource', function ($resource) {
  'use strict';

  return {
    software_keys_tables: $resource('/service/software_keys')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addSoftware_keysController', ['$mdDialog', '$software_keys', '$scope' , '$http', 'ngToast',function ($mdDialog, $software_keys, $scope, $http,ngToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(software_keys_table) {
    ngToast.create({
      className: 'success',
      content: 'New Content Added',
      dismissButton: 'true'
      });
    $mdDialog.hide(software_keys_table);
  }

    function fedup(response){
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
      $software_keys.software_keys_tables.save({software_keys_table: $scope.software_keys_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteSoftware_keysController', ['$authorize', 'software_keys_tables', '$mdDialog', '$software_keys', '$scope', '$q', 'ngToast',function ($authorize, software_keys_tables, $mdDialog, $software_keys, $scope, $q,ngToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(software_keys_table, index) {
    var deferred = $software_keys.software_keys_tables.remove({id: software_keys_table.software_keys_ID}, success, error);


    deferred.$promise.then(function () {
      software_keys_tables.splice(index, 1);
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
      $q.all(software_keys_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
