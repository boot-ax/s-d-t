angular.module('SE_App').controller('linksController', ['$mdDialog','$links', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $links, $scope, $mdEditDialog, $http) {
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
    order: 'source_url',
    page: 1
  };

  function success(links_tables) {
    angular.forEach(links_tables.data,function(row){
      // row.d
      var date_created_parts = row.date_created.split("-");
      row.date_created = new Date(parseInt(date_created_parts[0]),
                                    parseInt(date_created_parts[1])-1,
                                    parseInt(date_created_parts[2]));
    });
    $scope.links_tables = links_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addLinksController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/links/addLinksDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteLinksController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { links_tables: $scope.selected },
      templateUrl: 'tabs/links/deleteLinksDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $links.links_tables.get($scope.query, success).$promise;
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
      $obj.table = 'links';
      $obj.column = column;
      $obj.value = table[column];
      $obj.identifier = 'link_ID';
      $obj.id = table.link_ID;
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

  $scope.date_created = function(links_table){
    var dateFromDataBase = links_table.date_created;
    dateFromDataBase = new Date(dateFromDataBase);
    return dateFromDataBase;
  };


  $scope.switchValue = function(column, table){
    var $obj = {};
    $obj.table = 'links';
    $obj.column = column;
    $obj.value = table[column];
    $obj.identifier = 'link_ID';
    $obj.id = table.link_ID;
    $http.post('/service/updateItem', $obj);
  };


  $scope.changeDate = function(column, table){
    var $obj = {};
    $obj.table = 'links';
    $obj.column = column;
    $obj.value = table[column];
    $obj.value = table[column].getFullYear()+"-"+
    ("0"+(table[column].getMonth()+1)).slice(-2)+"-"+
    ("0"+table[column].getDate()).slice(-2);
    $obj.identifier = 'link_ID';
    $obj.id = table.link_ID;
    $http.post('/service/updateItem', $obj);
  };

}]);
