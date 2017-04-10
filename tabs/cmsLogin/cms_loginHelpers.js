angular.module('SE_App').factory('$cms_login', ['$resource', function ($resource) {
  'use strict';

  return {
    cms_login_tables: $resource('/service/cms_login')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addCMSController', ['$mdDialog', '$cms_login', '$scope' , '$http', '$q', 'ngToast',function ($mdDialog, $cms_login, $scope, $http, $q, ngToast) {
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
    ngToast.create({
      className: 'success',
      content: 'New Content Added',
      dismissButton: 'true'
      });
    $mdDialog.hide(cms_login_table);
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
    if($scope.item.form.$valid) {

      $cms_login.cms_login_tables.save({cms_login_table: $scope.cms_login_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteCMSController', ['$authorize', 'cms_login_tables', '$mdDialog', '$cms_login', '$scope', '$q', 'ngToast',function ($authorize, cms_login_tables, $mdDialog, $cms_login, $scope, $q, ngToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(cms_login_table, index) {
    var deferred = $cms_login.cms_login_tables.remove({id: cms_login_table.install_site_url_ID}, success, error);


    deferred.$promise.then(function () {
      cms_login_tables.splice(index, 1);
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
      $q.all(cms_login_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
