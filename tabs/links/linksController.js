angular.module('SE_App').controller('linksController', ['$mdDialog','$links', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $links, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;

  $scope.$file = 'links.csv';
  $scope.$header = ['source_url','target_url','anchor_text','alt_text','follow_link','date_created','title','comment','link_ID'];
  $scope.$location = '/service/links';

  $scope.selected = [];

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '15',
    order: 'source_url',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'links',
    db_ID:'link_ID',
    //table:hosting_table,
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
      templateUrl: 'inc/delete.html',
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

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDate = changeCellServices.changeDate;

  $scope.changeSwitchValue = changeCellServices.changeSwitchValue;
    $scope.bulkDownload = upDownloadService.bulkDownload;


  $scope.date_created = function(links_table){
    var dateFromDataBase = links_table.date_created;
    dateFromDataBase = new Date(dateFromDataBase);
    return dateFromDataBase;
  };


}]);
