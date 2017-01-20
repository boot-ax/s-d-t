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

  $scope.editTargetUrl = function (event, links_table, column) {
    event.stopPropagation();

    var promise = $mdEditDialog.small({
      modelValue: links_table.target_url,

      save: function (input) {
        links_table.target_url = input.$modelValue;
        var $obj = {};
        $obj.table = 'links';
        $obj.column = column;
        $obj.value = links_table.target_url;
        $obj.identifier = 'link_ID';
        $obj.id = links_table.link_ID;
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

  $scope.editSourceUrl = function (event, links_table, column) {
    event.stopPropagation();

    var promise = $mdEditDialog.small({
      modelValue: links_table.source_url,

      save: function (input) {
        links_table.source_url = input.$modelValue;
        var $obj = {};
        $obj.table = 'links';
        $obj.column = column;
        $obj.value = links_table.source_url;
        $obj.identifier = 'link_ID';
        $obj.id = links_table.link_ID;
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

  $scope.editAnchorText = function (event, links_table, column) {
    event.stopPropagation();
    var promise = $mdEditDialog.small({
      modelValue: links_table.anchor_text,
      save: function (input) {
        links_table.anchor_text = input.$modelValue;
        var $obj = {};
        $obj.table = 'links';
        $obj.column = column;
        $obj.value = links_table.anchor_text;
        $obj.identifier = 'link_ID';
        $obj.id = links_table.link_ID;
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

  $scope.editAltText = function (event, links_table, column) {
    event.stopPropagation();
    var promise = $mdEditDialog.small({
      modelValue: links_table.alt_text,
      save: function (input) {
        links_table.alt_text = input.$modelValue;
        var $obj = {};
        $obj.table = 'links';
        $obj.column = column;
        $obj.value = links_table.alt_text;
        $obj.identifier = 'link_ID';
        $obj.id = links_table.link_ID;
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

  $scope.editTitle = function (event, links_table, column) {
    event.stopPropagation();
    var promise = $mdEditDialog.small({
      modelValue: links_table.title,
      save: function (input) {
        links_table.title = input.$modelValue;
        var $obj = {};
        $obj.table = 'links';
        $obj.column = column;
        $obj.value = links_table.title;
        $obj.identifier = 'link_ID';
        $obj.id = links_table.link_ID;
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

  $scope.editComment = function (event, links_table, column) {
    event.stopPropagation();
    var promise = $mdEditDialog.small({
      modelValue: links_table.comment,
      save: function (input) {
        links_table.comment = input.$modelValue;
        var $obj = {};
        $obj.table = 'links';
        $obj.column = column;
        $obj.value = links_table.comment;
        $obj.identifier = 'link_ID';
        $obj.id = links_table.link_ID;
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




  $scope.date_created = function(links_table){
    var dateFromDataBase = links_table.date_created;
    dateFromDataBase = new Date(dateFromDataBase);
    return dateFromDataBase;
  };

  $scope.changeFollowLinkValue = function(column, links_table){
    var $obj = {};
    $obj.table = 'links';
    $obj.column = column;
    $obj.value = links_table.follow_link;
    $obj.identifier = 'link_ID';
    $obj.id = links_table.link_ID;
    $http.post('/service/updateItem', $obj);
  };

  $scope.changeDateCreated = function(column, links_table){
    var $obj = {};
    $obj.table = 'links';
    $obj.column = column;
    $obj.value = links_table.date_created;
    $obj.value = links_table.date_created.getFullYear()+"-"+
    ("0"+(links_table.date_created.getMonth()+1)).slice(-2)+"-"+
    ("0"+links_table.date_created.getDate()).slice(-2);
    $obj.identifier = 'link_ID';
    $obj.id = links_table.link_ID;
    $http.post('/service/updateItem', $obj);
  };

}]);
