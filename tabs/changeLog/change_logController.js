angular.module('SE_App').controller('change_logController', ['$mdDialog','$change_log', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $change_log, $scope, $mdEditDialog, $http) {
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
    order: 'date_entered',
    page: 1
  };

  function success(change_log_tables) {
    angular.forEach(change_log_tables.data,function(row){
      // row.d
      var date_entered_parts = row.date_entered.split("-");
      row.date_entered = new Date(parseInt(date_entered_parts[0]),
                                    parseInt(date_entered_parts[1])-1,
                                    parseInt(date_entered_parts[2]));
    });
    $scope.change_log_tables = change_log_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addChange_logController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/changeLog/addchange_logDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteChange_logController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { change_log_tables: $scope.selected },
      templateUrl: 'tabs/changeLog/deletechange_logDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $change_log.change_log_tables.get($scope.query, success).$promise;
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

    var promise = $mdEditDialog.small({
      modelValue: table[column],

      save: function (input) {
        table[column] = input.$modelValue;
        var $obj = {};
        $obj.table = 'change_log';
        $obj.column = column;
        $obj.value = table[column];
        $obj.identifier = 'change_log_ID';
        $obj.id = table.change_log_ID;
        $http.post('service/updateItem',$obj);
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


  $scope.date_entered = function(change_log_table){
    var dateFromDataBase = change_log_table.date_entered;
    dateFromDataBase = new Date(dateFromDataBase);
    return dateFromDataBase;
  };

  $scope.switchValue = function(column, table){
    var $obj = {};
    $obj.table = 'change_log';
    $obj.column = column;
    $obj.value = table[column];
    $obj.identifier = 'change_log_ID';
    $obj.id = table.change_log_ID;
    $http.post('/service/updateItem', $obj);
  };

  $scope.changeDate = function(column, table){
    var $obj = {};
    $obj.table = 'change_log';
    $obj.column = column;
    $obj.value = table[column];
    $obj.value = table[column].getFullYear()+"-"+
    ("0"+(table[column].getMonth()+1)).slice(-2)+"-"+
    ("0"+table[column].getDate()).slice(-2);
    $obj.identifier = 'change_log_ID';
    $obj.id = table.change_log_ID;
    $http.post('/service/updateItem', $obj);
  };


$scope.changeDropdown = function(column, value, table){
var $obj = {};
$obj.table = 'change_log';
	  $obj.column = column;
	  $obj.value = table[value];
	  $obj.identifier = 'change_log_ID';
	  $obj.id = table.change_log_ID;

$http.post('/service/updateItem', $obj);
};


$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

}]);
