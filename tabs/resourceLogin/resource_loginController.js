angular.module('SE_App').controller('resource_loginController', ['$mdDialog','$resource_login', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $resource_login, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'resource_login.csv';
  $scope.$header = ['resource_url_name','name_of_product','username','password','product_description','resource_url_ID','user_name','user_email'];
  $scope.$location = '/service/resource_login';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'resource_login'){
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
    limit: '15',
    order: 'resource_url_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'resource_login',
    db_ID:'resource_url_ID',
    //table:hosting_table,
  };

  function success(resource_login_tables) {
    $scope.resource_login_tables = resource_login_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addResource_loginController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/resourceLogin/addResource_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteResource_loginController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { resource_login_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $resource_login.resource_login_tables.get($scope.query, success).$promise;
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
    $scope.bulkDownload = upDownloadService.bulkDownload;


//Below is changing the selection and Date Pickers


$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

}]);
