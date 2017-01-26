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
        $obj.table = 'person';
        $obj.column = column;
        $obj.value = table[column];
        $obj.identifier = 'person_ID';
        $obj.id = table.person_ID;
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


}]);
