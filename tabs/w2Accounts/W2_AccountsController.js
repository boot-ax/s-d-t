angular.module('SE_App').controller('W2_accountsController', ['$mdDialog','$W2_accounts', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $W2_accounts, $scope, $mdEditDialog, $http) {
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

  $scope.editLoginUrlName = function (event, W2_accounts_table, column) {
  event.stopPropagation();

  var promise = $mdEditDialog.small({
    modelValue: W2_accounts_table.login_url_name,

    save: function (input) {
	  W2_accounts_table.login_url_name = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = W2_accounts_table.login_url_name;
	  $obj.identifier = 'W2_ID';
	  $obj.id = W2_accounts_table.W2_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 382
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editLogin = function (event, W2_accounts_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: W2_accounts_table.login,
    save: function (input) {
	  W2_accounts_table.login = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = W2_accounts_table.login;
	  $obj.identifier = 'W2_ID';
	  $obj.id = W2_accounts_table.W2_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 382
    },
  });
    promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editPassword = function (event, W2_accounts_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: W2_accounts_table.password,
    save: function (input) {
	  W2_accounts_table.password = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = W2_accounts_table.password;
	  $obj.identifier = 'W2_ID';
	  $obj.id = W2_accounts_table.W2_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 382
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

$scope.editAccountUrl = function (event, W2_accounts_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: W2_accounts_table.account_url,
    save: function (input) {
	  W2_accounts_table.account_url = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = W2_accounts_table.account_url;
	  $obj.identifier = 'W2_ID';
	  $obj.id = W2_accounts_table.W2_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });
    promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editAttachedDomain = function (event, W2_accounts_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: W2_accounts_table.attached_domain,
    save: function (input) {
	  W2_accounts_table.attached_domain = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = W2_accounts_table.attached_domain;
	  $obj.identifier = 'W2_ID';
	  $obj.id = W2_accounts_table.W2_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 4
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

$scope.changePersonValue = function(column, W2_accounts_table){
var $obj = {};
$obj.table = 'W2_accounts';
	  $obj.column = column;
	  $obj.value = W2_accounts_table.person_ID;
	  $obj.identifier = 'W2_ID';
	  $obj.id = W2_accounts_table.W2_ID;
$http.post('/service/updateItem', $obj);
};


$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};



}]);
