


angular.module('SE_App').controller('registrarController', ['$mdDialog','$registrar', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService','$auth',function ($mdDialog, $registrar, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService,$auth) {
  'use strict';

  var bookmark;
  var payload = JSON.parse($auth.getPayload().sub);
  $scope.$firstSpan = '<span class="firstSpan">';
  $scope.$secondSpan = '<span class="secondSpan">';
  $scope.$file = 'registrar.csv';
  $scope.$header = ['registrar_name','login_url','login_username','login_password','credit_card_last_4','registrar_ID','user_name','user_email'];
  $scope.$location = '/service/registrar';

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'registrar_name',
    page: 1,
    name: payload.user_name,
    email: payload.user_email,
    security:payload.user_security
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
      templateUrl: 'inc/delete.html',
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
    $scope.bulkDownload = upDownloadService.bulkDownload;

//Below is changing the selection and Date Pickers

$scope.getOwnersFunc = function(){
	$http.get('service/getowners')
		.then(function(response){
	$scope.getOwners = response.data;
	});
};

}]);
