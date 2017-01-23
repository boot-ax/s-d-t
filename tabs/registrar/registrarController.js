


angular.module('SE_App').controller('registrarController', ['$mdDialog','$registrar', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $registrar, $scope, $mdEditDialog, $http) {
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

  $scope.editRegistrarName = function (event, registrar_table, column) {
  event.stopPropagation();

  var promise = $mdEditDialog.small({
    modelValue: registrar_table.registrar_name,

    save: function (input) {
	  registrar_table.registrar_name = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'registrar';
	  $obj.column = column;
	  $obj.value = registrar_table.registrar_name;
	  $obj.identifier = 'registrar_ID';
	  $obj.id = registrar_table.registrar_ID;
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

  $scope.editLoginUrl = function (event, registrar_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: registrar_table.login_url,
    save: function (input) {
	  registrar_table.login_url = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'registrar';
	  $obj.column = column;
	  $obj.value = registrar_table.login_url;
	  $obj.identifier = 'registrar_ID';
	  $obj.id = registrar_table.registrar_ID;
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

  $scope.editUsername = function (event, registrar_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: registrar_table.login_username,
    save: function (input) {
	  registrar_table.login_username = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'registrar';
	  $obj.column = column;
	  $obj.value = registrar_table.login_username;
	  $obj.identifier = 'registrar_ID';
	  $obj.id = registrar_table.registrar_ID;
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

$scope.editPassword = function (event, registrar_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: registrar_table.login_password,
    save: function (input) {
	  registrar_table.login_password = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'registrar';
	  $obj.column = column;
	  $obj.value = registrar_table.login_password;
	  $obj.identifier = 'registrar_ID';
	  $obj.id = registrar_table.registrar_ID;
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

  $scope.editCreditLastFour = function (event, registrar_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: registrar_table.credit_card_last_4,
    save: function (input) {
	  registrar_table.credit_card_last_4 = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'registrar';
	  $obj.column = column;
	  $obj.value = registrar_table.credit_card_last_4;
	  $obj.identifier = 'registrar_ID';
	  $obj.id = registrar_table.registrar_ID;
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


$scope.changeDropdown = function(column, value, table){
var $obj = {};
$obj.table = 'registrar';
	  $obj.column = column;
	  $obj.value = table[value];
	  $obj.identifier = 'registrar_ID';
	  $obj.id = table.registrar_ID;

$http.post('/service/updateItem', $obj);
};


$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

}]);
