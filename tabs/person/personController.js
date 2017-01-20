angular.module('SE_App').controller('personController', ['$mdDialog','$person', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $person, $scope, $mdEditDialog, $http) {
  'use strict';

  var bookmark;

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'person'){
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
    order: 'last_name',
    page: 1
  };

  function success(person_tables) {
    $scope.person_tables = person_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addPersonController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/person/addPersonDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deletePersonController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { person_tables: $scope.selected },
      templateUrl: 'tabs/person/deletePersonDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $person.person_tables.get($scope.query, success).$promise;
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

  $scope.editFirstName = function (event, person_table, column) {
  event.stopPropagation();

  var promise = $mdEditDialog.small({
    modelValue: person_table.first_name,

    save: function (input) {
	  person_table.first_name = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.first_name;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
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

  $scope.editLastName = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.last_name,
    save: function (input) {
	  person_table.last_name = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.last_name;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
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

  $scope.editEmail = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.email,
    save: function (input) {
	  person_table.email = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.email;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
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

$scope.editStreetAddress = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.street_address,
    save: function (input) {
	  person_table.street_address = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.street_address;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
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

  $scope.editCity = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.city,
    save: function (input) {
	  person_table.city = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.city;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
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

 $scope.editState = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.state,
    save: function (input) {
	  person_table.state = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.state;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
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

 $scope.editPhoneNumber = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.phone_number,
    save: function (input) {
	  person_table.phone_number = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.phone_number;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {

    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

 $scope.editZipCode = function (event, person_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: person_table.zip_code,
    save: function (input) {
	  person_table.zip_code = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'person';
	  $obj.column = column;
	  $obj.value = person_table.zip_code;
	  $obj.identifier = 'person_ID';
	  $obj.id = person_table.person_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 5
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};



}]);
