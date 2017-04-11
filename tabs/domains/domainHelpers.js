angular.module('SE_App').factory('$domains', ['$resource', function ($resource) {
  'use strict';

  return {
    domains_tables: $resource('/service/domains')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addDomainController', ['$mdDialog', '$domains', '$scope' , '$http', '$q','$mdToast',function ($mdDialog, $domains, $scope, $http, $q,$mdToast) {
  'use strict';
$scope.myDate = new Date();

$scope.getHostsFunc = function(){
	$http.get('service/gethosts')
.then(function(response){
	$scope.getHosts = response.data;
	});
};

$scope.getRegistrarsFunc = function(){
	$http.get('service/getregistrars')
		.then(function(response){

	$scope.getRegistrars = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(domains_table) {
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
    $mdDialog.hide(domains_table);
  }

    function fedup(response){
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

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.domains_table);
    data.date_purchased = data.date_purchased.getFullYear()+"-"+
                          ("0"+(data.date_purchased.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_purchased.getDate()).slice(-2);

    data.expiration_date = data.expiration_date.getFullYear()+"-"+
                          ("0"+(data.expiration_date.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.expiration_date.getDate()).slice(-2);

    if($scope.item.form.$valid) {
      $domains.domains_tables.save({domains_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteDomainController', ['$authorize', 'domains_tables', '$mdDialog', '$domains', '$scope', '$q', '$mdToast',function ($authorize, domains_tables, $mdDialog, $domains, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(domains_table, index) {
    var deferred = $domains.domains_tables.remove({id: domains_table.domain_ID}, success, error);

    deferred.$promise.then(function () {
      domains_tables.splice(index, 1);
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
    $q.all(domains_tables.forEach(deleteDessert)).then(onComplete);
  };

}]);
