


angular.module('SE_App').controller('registrarController', ['$mdDialog','$registrar', '$scope', '$mdEditDialog', '$http','$q','changeCellServices',function ($mdDialog, $registrar, $scope, $mdEditDialog, $http,$q,changeCellServices) {
  'use strict';

  var bookmark;

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '5',
    order: 'registrar_name',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'registrar',
    db_ID:'registrar_ID',
    //table:hosting_table,
  };

  function success(registrar_tables) {
    $scope.registrar_tables = registrar_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addRegistrarController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/registrar/addRegistrarDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteRegistrarController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { registrar_tables: $scope.selected },
      templateUrl: 'tabs/registrar/deleteRegistrarDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'registrars'){
	  	$scope.getDesserts();
	  }
  });

  $scope.getDesserts = function () {
    $scope.promise = $registrar.registrar_tables.get($scope.query, success).$promise;
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

//Below is changing the selection and Date Pickers

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

}]);
