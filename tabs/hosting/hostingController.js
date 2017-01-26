angular.module('SE_App').controller('hostingController', ['$mdDialog','$hosting', '$scope', '$mdEditDialog', '$http','$q',function ($mdDialog, $hosting, $scope, $mdEditDialog, $http,$q) {
  'use strict';

  var bookmark;

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'hosting'){
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
    order: 'hosting_name',
    page: 1
  };

  function success(hosting_tables) {
    angular.forEach(hosting_tables.data,function(row){
      // row.d
      var date_started_parts = row.date_started.split("-");
      row.date_started = new Date(parseInt(date_started_parts[0]),
                                    parseInt(date_started_parts[1])-1,
                                    parseInt(date_started_parts[2]));
      var expiration_date_parts = row.expiration_date.split("-");
      row.expiration_date = new Date(parseInt(expiration_date_parts[0]),
                                    parseInt(expiration_date_parts[1])-1,
                                    parseInt(expiration_date_parts[2]));
    });
    $scope.hosting_tables = hosting_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addHostingController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/hosting/addHostingDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteHostingController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { hosting_tables: $scope.selected },
      templateUrl: 'tabs/hosting/deleteHostingDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $hosting.hosting_tables.get($scope.query, success).$promise;
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
    $obj.table = 'hosting';
    $obj.column = column;
    $obj.value = table[column];
    $obj.identifier = 'hosting_ID';
    $obj.id = table.hosting_ID;
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

$scope.date_started = function(hosting_table){
	var dateFromDataBase = hosting_table.date_started;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};

$scope.expiration_date = function(hosting_table){
	var dateFromDataBase = hosting_table.expiration_date;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};


$scope.changeDate = function(column, table){
  var $obj = {};
  $obj.table = 'hosting';
  $obj.column = column;
  $obj.value = table[column];
  $obj.value = table[column].getFullYear()+"-"+
  ("0"+(table[column].getMonth()+1)).slice(-2)+"-"+
  ("0"+table[column].getDate()).slice(-2);
  $obj.identifier = 'hosting_ID';
  $obj.id = table.hosting_ID;
  $http.post('/service/updateItem', $obj);
};


}]);
