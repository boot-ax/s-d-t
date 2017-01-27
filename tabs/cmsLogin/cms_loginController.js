angular.module('SE_App').controller('cms_loginController', ['$mdDialog','$cms_login', '$scope', '$mdEditDialog', '$http','$q','changeCellServices',function ($mdDialog, $cms_login, $scope, $mdEditDialog, $http,$q,changeCellServices) {
  'use strict';

  var bookmark;

      $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'cms_login'){
	  	$scope.getDesserts();
	  }
  });

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '5',
    order: 'install_site_url_name',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'cms_login',
    db_ID:'install_site_url_ID',
    //table:hosting_table,
  };

  function success(cms_login_tables) {
    $scope.cms_login_tables = cms_login_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addCMSController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/cmsLogin/addCms_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteCMSController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { cms_login_tables: $scope.selected },
      templateUrl: 'tabs/cmsLogin/deleteCms_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $cms_login.cms_login_tables.get($scope.query, success).$promise;
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';

    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

    $scope.getDesserts();
  });

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDropdown = changeCellServices.changeDropdown;

$scope.getDomainsFunc = function(){
	$http.get('service/getdomains')
.then(function(response){
	$scope.getDomains = response.data;
	});
};

}]);
