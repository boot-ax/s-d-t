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

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(change_log_table) {
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
    $mdDialog.hide(change_log_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
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

angular.module('SE_App').controller('deleteChange_logController', ['$authorize', 'change_log_tables', '$mdDialog', '$change_log', '$scope', '$q', '$mdToast',function ($authorize, change_log_tables, $mdDialog, $change_log, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(change_log_table, index) {
    var deferred = $change_log.change_log_tables.remove({id: change_log_table.change_log_ID}, success, error);


    deferred.$promise.then(function () {
      change_log_tables.splice(index, 1);
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
      $q.all(change_log_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);

// =======================================================

angular.module('SE_App').controller('bulkUploadController', ['$mdDialog', '$change_log', '$scope' , '$http', '$q','$mdToast', function ($mdDialog, $change_log, $scope, $http, $q, $mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function success(change_log_table) {
    $mdToast.create({
      className: 'success',
      content: 'Successfully Deleted',
      dismissButton: 'true'
      });
    $mdDialog.hide(change_log_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
  }


}])
;

//  =========================================================
