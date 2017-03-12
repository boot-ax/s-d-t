angular.module('SE_App').controller('software_keysController', ['$mdDialog','$software_keys', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService','$auth',function ($mdDialog, $software_keys, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService,$auth) {
  'use strict';

  var bookmark;
  var payload = JSON.parse($auth.getPayload().sub);
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'software_keys.csv';
  $scope.$header = ['software_name','license_key','serial_number','comments','software_keys_ID','first_name','last_name'];
  $scope.$location = '/service/software_keys';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'software_keys'){
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
    order: 'software_name',
    page: 1,
    name: payload.user_name,
    email: payload.user_email,
    security:payload.user_security
  };

  $scope.dbTableInfo = {
    db_table:'software_keys',
    db_ID:'software_keys_ID',
    //table:hosting_table,
  };

  function success(software_keys_tables) {
    $scope.software_keys_tables = software_keys_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addSoftware_keysController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/softwareKeys/addSoftware_keysDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteSoftware_keysController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { software_keys_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $software_keys.software_keys_tables.get($scope.query, success).$promise;
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
