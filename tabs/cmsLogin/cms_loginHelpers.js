angular.module('SE_App').factory('$cms_login', ['$resource', function ($resource) {
  'use strict';

  return {
    cms_login_tables: $resource('/service/cms_login')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addCMSController', ['$mdDialog', '$cms_login', '$scope' , '$http', '$q', '$mdToast',  function ($mdDialog, $cms_login, $scope, $http, $q, $mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getDomainsFunc = function(){
	$http.get('service/getdomains')
.then(function(response){
	$scope.getDomains = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(cms_login_table) {
    $mdToast.show(
        $mdToast.simple()
          .textContent('New Content Added')
          .hideDelay(3000)
      );
    $mdDialog.hide(cms_login_table);
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

    if($scope.item.form.$valid) {
      $cms_login.cms_login_tables.save({cms_login_table: $scope.cms_login_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteCMSController', ['$authorize', 'cms_login_tables', '$mdDialog', '$cms_login', '$scope', '$q', function ($authorize, cms_login_tables, $mdDialog, $cms_login, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(cms_login_table, index) {
    var deferred = $cms_login.cms_login_tables.remove({id: cms_login_table.install_site_url_ID});

    deferred.$promise.then(function () {
      cms_login_tables.splice(index, 1);
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
    $q.all(cms_login_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);
