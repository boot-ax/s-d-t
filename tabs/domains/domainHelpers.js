angular.module('SE_App').factory('$domains', ['$resource', function ($resource) {
  'use strict';

  return {
    domains_tables: $resource('/service/domains')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addDomainController', ['$mdDialog', '$domains', '$scope' , '$http', '$q','ngToast',function ($mdDialog, $domains, $scope, $http, $q,ngToast) {
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
    ngToast.create({
      className: 'success',
      content: 'New Content Added',
      dismissButton: 'true'
      });
    $mdDialog.hide(domains_table);
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

angular.module('SE_App').controller('deleteDomainController', ['$authorize', 'domains_tables', '$mdDialog', '$domains', '$scope', '$q', 'ngToast',function ($authorize, domains_tables, $mdDialog, $domains, $scope, $q,ngToast) {
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
    $q.all(domains_tables.forEach(deleteDessert)).then(onComplete);
  };

}]);
