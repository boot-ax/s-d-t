angular.module('SE_App').controller('W2_accountsController', ['$mdDialog','$W2_accounts', '$scope', '$mdEditDialog', '$http','$q',function ($mdDialog, $W2_accounts, $scope, $mdEditDialog, $http,$q) {
  'use strict';

  var bookmark;

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
    limit: '5',
    order: 'login_url_name',
    page: 1
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
      $obj.table = 'W2_accounts';
      $obj.column = column;
      $obj.value = table[column];
      $obj.identifier = 'W2_ID';
      $obj.id = table.W2_ID;
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


//Below is changing the selection and Date Pickers

$scope.changeDropdown = function(column, value, table){
var $obj = {};
$obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = table[value];
	  $obj.identifier = 'W2_ID';
	  $obj.id = table.W2_ID;

$http.post('/service/updateItem', $obj);
};


$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};



}]);
