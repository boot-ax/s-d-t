angular.module('SE_App').controller('W2_accountsController', ['$mdDialog','$W2_accounts', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $W2_accounts, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;

  $scope.$file = 'W2_accounts.csv';
  $scope.$header = ['login_url_name','login','password','account_url','attached_domain','W2_ID','first_name','last_name'];
  $scope.$location = '/service/W2_accounts';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'W2_accounts'){
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
    order: 'login_url_name',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'W2_accounts',
    db_ID:'W2_ID',
    //table:hosting_table,
  };

  function success(W2_accounts_tables) {
    $scope.W2_accounts_tables = W2_accounts_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addW2_AccountsController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/w2Accounts/addW2_AccountsDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteW2_AccountsController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { W2_accounts_tables: $scope.selected },
      templateUrl: 'tabs/w2Accounts/deleteW2_AccountsDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $W2_accounts.W2_accounts_tables.get($scope.query, success).$promise;
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

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};



}]);
