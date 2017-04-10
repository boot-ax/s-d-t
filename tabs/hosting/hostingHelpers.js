angular.module('SE_App').factory('$hosting', ['$resource', function ($resource) {
  'use strict';

  return {
    hosting_tables: $resource('/service/hosting')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addHostingController', ['$mdDialog', '$hosting', '$scope' , '$http', 'ngToast',function ($mdDialog, $hosting, $scope, $http, ngToast) {
  'use strict';
$scope.myDate = new Date();

  this.cancel = $mdDialog.cancel;

  function success(hosting_table) {
    ngToast.create({
      className: 'success',
      content: 'New Content Added',
      dismissButton: 'true'
      });
    $mdDialog.hide(hosting_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    ngToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
  }


this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.hosting_table);
    data.date_started = data.date_started.getFullYear()+"-"+
                          ("0"+(data.date_started.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_started.getDate()).slice(-2);

    data.expiration_date = data.expiration_date.getFullYear()+"-"+
                          ("0"+(data.expiration_date.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.expiration_date.getDate()).slice(-2);

    if($scope.item.form.$valid) {
      $hosting.hosting_tables.save({hosting_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteHostingController', ['$authorize', 'hosting_tables', '$mdDialog', '$hosting', '$scope', '$q', 'ngToast',function ($authorize, hosting_tables, $mdDialog, $hosting, $scope, $q, ngToast) {
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
      $q.all(hosting_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
