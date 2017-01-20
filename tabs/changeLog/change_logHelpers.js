angular.module('SE_App').factory('$change_log', ['$resource', function ($resource) {
  'use strict';

  return {
    change_log_tables: $resource('/service/change_log')
  };
}]);

//=========================================================== 

angular.module('SE_App').controller('addChange_logController', ['$mdDialog', '$change_log', '$scope' , '$http', '$q','$mdToast', function ($mdDialog, $change_log, $scope, $http, $q, $mdToast) {
  'use strict';
 

$scope.myDate = new Date(); 

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){	
	$scope.getPersons = response.data;
	});	
}; 

$scope.getChange_logFunc = function(){
	$http.get('service/getchange_log')
		.then(function(response){	
	$scope.getChange_log = response.data;
	});	
}; 

  this.cancel = $mdDialog.cancel;
  
  function success(change_log_table) {
    $mdDialog.hide(change_log_table);
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

    var data = angular.copy($scope.change_log_table);
    data.date_entered = data.date_entered.getFullYear()+"-"+
                          ("0"+(data.date_entered.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_entered.getDate()).slice(-2);
                          

    if($scope.item.form.$valid) {
      $change_log.change_log_tables.save({change_log_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteChange_logController', ['$authorize', 'change_log_tables', '$mdDialog', '$change_log', '$scope', '$q', function ($authorize, change_log_tables, $mdDialog, $change_log, $scope, $q) {
  'use strict';
  
  this.cancel = $mdDialog.cancel;
  
  function deleteDessert(change_log_table, index) {
    var deferred = $change_log.change_log_tables.remove({id: change_log_table.change_log_ID});
    
    deferred.$promise.then(function () {
      change_log_tables.splice(index, 1);
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
    $q.all(change_log_tables.forEach(deleteDessert)).then(onComplete);
  }
  
  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };
  
}]);

