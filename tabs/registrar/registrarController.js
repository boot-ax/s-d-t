


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
          var deferred = $q.defer();
          table[column] = input.$modelValue;
          var $obj = {};
          $obj.table = 'registrar';
          $obj.column = column;
          $obj.value = table[column];
          $obj.identifier = 'registrar_ID';
          $obj.id = table.registrar_ID;
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
        //console.log("Inside then statement before input");
          var input = ctrl.getInput();
          input.$viewChangeListeners.push(function () {
            //console.log("Inside then statement after input");
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
