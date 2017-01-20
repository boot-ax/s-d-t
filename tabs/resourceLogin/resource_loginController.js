angular.module('SE_App').controller('resource_loginController', ['$mdDialog','$resource_login', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $resource_login, $scope, $mdEditDialog, $http) {
  'use strict';

  var bookmark;

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
    limit: '5',
    order: 'resource_url_name',
    page: 1
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
      templateUrl: 'tabs/resourceLogin/deleteResource_loginDialog.html',
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

  $scope.editResourceUrlName = function (event, resource_login_table, column) {
  event.stopPropagation();

  var promise = $mdEditDialog.small({
    modelValue: resource_login_table.resource_url_name,

    save: function (input) {
	  resource_login_table.resource_url_name = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = resource_login_table.resource_url_name;
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = resource_login_table.resource_url_ID;
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

  $scope.editNameOfProduct = function (event, resource_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: resource_login_table.name_of_product,
    save: function (input) {
	  resource_login_table.name_of_product = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = resource_login_table.name_of_product;
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = resource_login_table.resource_url_ID;
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

  $scope.editUsername = function (event, resource_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: resource_login_table.username,
    save: function (input) {
	  resource_login_table.username = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = resource_login_table.username;
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = resource_login_table.resource_url_ID;
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

$scope.editPassword = function (event, resource_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: resource_login_table.password,
    save: function (input) {
	  resource_login_table.password = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = resource_login_table.password;
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = resource_login_table.resource_url_ID;
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

  $scope.editProductDescription = function (event, resource_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: resource_login_table.product_description,
    save: function (input) {
	  resource_login_table.product_description = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = resource_login_table.product_description;
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = resource_login_table.resource_url_ID;
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


//Below is changing the selection and Date Pickers

$scope.changePersonValue = function(column, resource_login_table){
var $obj = {};
$obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = resource_login_table.person_ID;
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = resource_login_table.resource_url_ID;
$http.post('/service/updateItem', $obj);
};


$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

}]);
