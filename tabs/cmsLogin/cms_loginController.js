angular.module('SE_App').controller('cms_loginController', ['$mdDialog','$cms_login', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $cms_login, $scope, $mdEditDialog, $http) {
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

  $scope.changeCellText = function (event, table, column, $length) {
  event.stopPropagation();

  var success  = function(data){
    $mdToast.show(
        $mdToast.simple()
          .textContent(data.data)
          .hideDelay(3000)
      );
  };

  var failure  = function(data){
    $mdToast.show(
        $mdToast.simple()
          .textContent(data.data)
          .hideDelay(3000)
      );
  };

  var promise = $mdEditDialog.small({
    modelValue: table[column],

    save: function (input) {
      table[column] = input.$modelValue;
      var $obj = {};
      $obj.table = 'cms_login';
      $obj.column = column;
      $obj.value = table[column];
      $obj.identifier = 'install_site_url_ID';
      $obj.id = table.install_site_url_ID;
      $http.post('service/updateItem',$obj).then(function(response){
        success(response);
        deferred.resolve();
      },function(response){
        failure(response);
        deferred.reject();
      });
      return deferred.promise;
    },
    targetEvent: event,
    validators: {
      'md-maxlength': $length
    },
  });

  promise.then(function (ctrl) {
      var input = ctrl.getInput();
      input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};



$scope.changeDropdown = function(column, value, table){
var $obj = {};
$obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = table[value];
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = table.install_site_url_ID;

$http.post('/service/updateItem', $obj);
};



$scope.getDomainsFunc = function(){
	$http.get('service/getdomains')
.then(function(response){
	$scope.getDomains = response.data;
	});
};

}]);
