angular.module('SE_App').factory('$hosting', ['$resource', function ($resource) {
  'use strict';

  return {
    hosting_tables: $resource('/service/hosting')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addHostingController', ['$mdDialog', '$hosting', '$scope' , '$http', '$mdToast',function ($mdDialog, $hosting, $scope, $http, $mdToast) {
  'use strict';
$scope.myDate = new Date();

  this.cancel = $mdDialog.cancel;

  function success(hosting_table) {
    $mdToast.show(
        $mdToast.simple()
          .textContent('New Content Added')
          .hideDelay(3000)
      );
    $mdDialog.hide(hosting_table);
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

angular.module('SE_App').controller('deleteHostingController', ['$authorize', 'hosting_tables', '$mdDialog', '$hosting', '$scope', '$q', function ($authorize, hosting_tables, $mdDialog, $hosting, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(hosting_table, index) {
    var deferred = $hosting.hosting_tables.remove({id: hosting_table.hosting_ID});

    deferred.$promise.then(function () {
      hosting_tables.splice(index, 1);
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
    $q.all(hosting_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);
