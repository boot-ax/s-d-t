angular.module('SE_App').factory('$registrar', ['$resource', function ($resource) {
  'use strict';

  return {
    registrar_tables: $resource('/service/registrar')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addRegistrarController', ['$mdDialog', '$registrar', '$scope' , '$http', '$mdToast',function ($mdDialog, $registrar, $scope, $http, $mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(registrar_table) {
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
    $mdDialog.hide(registrar_table);
  }

  function fedup(response){
    $mdToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $registrar.registrar_tables.save({registrar_table: $scope.registrar_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteRegistrarController', ['$authorize', 'registrar_tables', '$mdDialog', '$registrar', '$scope', '$q', '$mdToast',function ($authorize, registrar_tables, $mdDialog, $registrar, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(registrar_table, index) {
    var deferred = $registrar.registrar_tables.remove({id: registrar_table.registrar_ID}, success, error);


    deferred.$promise.then(function () {
      registrar_tables.splice(index, 1);
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
      $q.all(registrar_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
