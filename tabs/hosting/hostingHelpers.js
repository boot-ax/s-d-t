angular.module('SE_App').factory('$hosting', ['$resource', function ($resource) {
  'use strict';

  return {
    hosting_tables: $resource('/service/hosting')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addHostingController', ['$mdDialog', '$hosting', '$scope' , '$http', '$mdToast',function ($mdDialog, $hosting, $scope, $http, $mdToast) {
  'use strict';
$scope.myDate = null;

  this.cancel = $mdDialog.cancel;

  function success(hosting_table) {
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
    $mdDialog.hide(hosting_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
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

    var data = angular.copy($scope.hosting_table);
    if(data.date_started == null){
      data.date_started = null;
    } else {
    data.date_started = data.date_started.getFullYear()+"-"+
                          ("0"+(data.date_started.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_started.getDate()).slice(-2);
          }
            if(data.expiration_date == null){
              data.expiration_date = null;
            } else {
    data.expiration_date = data.expiration_date.getFullYear()+"-"+
                          ("0"+(data.expiration_date.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.expiration_date.getDate()).slice(-2);
                        }
    if($scope.item.form.$valid) {
      $hosting.hosting_tables.save({hosting_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteHostingController', ['$authorize', 'hosting_tables', '$mdDialog', '$hosting', '$scope', '$q', '$mdToast',function ($authorize, hosting_tables, $mdDialog, $hosting, $scope, $q, $mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(hosting_table, index) {
    var deferred = $hosting.hosting_tables.remove({id: hosting_table.hosting_ID}, success, error);

    deferred.$promise.then(function () {
      hosting_tables.splice(index, 1);
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
      $q.all(hosting_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
