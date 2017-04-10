angular.module('SE_App').factory('$url_data', ['$resource', function ($resource) {
  'use strict';

  return {
    url_data_tables: $resource('/service/url_data')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addUrl_dataController', ['$mdDialog', '$url_data', '$scope' , '$http', '$mdToast',function ($mdDialog, $url_data, $scope, $http,$mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(url_data_table) {
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
    $mdDialog.hide(url_data_table);
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
      $url_data.url_data_tables.save({url_data_table: $scope.url_data_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteUrl_dataController', ['$authorize', 'url_data_tables', '$mdDialog', '$url_data', '$scope', '$q', '$mdToast',function ($authorize, url_data_tables, $mdDialog, $url_data, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(url_data_table, index) {
    var deferred = $url_data.url_data_tables.remove({id: url_data_table.url_hash}, success, error);


    deferred.$promise.then(function () {
      url_data_tables.splice(index, 1);
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
      $q.all(url_data_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
