angular.module('SE_App').controller('resource_loginController', ['$mdDialog','$resource_login', '$scope', '$mdEditDialog', '$http','$q',function ($mdDialog, $resource_login, $scope, $mdEditDialog, $http,$q) {
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
        $obj.table = 'resource_login';
        $obj.column = column;
        $obj.value = table[column];
        $obj.identifier = 'resource_url_ID';
        $obj.id = table.resource_url_ID;
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
$obj.table = 'resource_login';
	  $obj.column = column;
	  $obj.value = table[value];
	  $obj.identifier = 'resource_url_ID';
	  $obj.id = table.resource_url_ID;

$http.post('/service/updateItem', $obj);
};


$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

}]);
