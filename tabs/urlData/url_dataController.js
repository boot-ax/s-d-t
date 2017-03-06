angular.module('SE_App').controller('url_dataController', ['$mdDialog','$url_data', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $url_data, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;

  $scope.$file = 'url_data.csv';
  $scope.$header = ['url_name','crawl_frequency','da','pa','tf','cf','status_code','ose_num_links','majestic_num_links','url_hash'];
  $scope.$location = '/service/url_data';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'url_data'){
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
    limit: '15',
    order: 'url_name',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'url_data',
    db_ID:'url_hash',
    //table:hosting_table,
  };

  function success(url_data_tables) {
    $scope.url_data_tables = url_data_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addUrl_dataController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/urlData/addUrl_dataDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteUrl_dataController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { url_data_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $url_data.url_data_tables.get($scope.query, success).$promise;
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

  $scope.changeDropdown = changeCellServices.changeDropdown;
    $scope.bulkDownload = upDownloadService.bulkDownload;


//Below is changing the selection and Date Pickers


$scope.getFrequencyFunc = function(){
  $frequencies = ['Daily','Weekly','Monthly','Quartly'];
	$scope.getFreq = $frequencies;

};

}]);
