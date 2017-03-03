angular.module('SE_App').controller('hostingController', ['$mdDialog','$hosting', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService',function ($mdDialog, $hosting, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;

  $scope.$file = 'hosting.csv';
  $scope.$header = ['hosting_name','login_url','username','password','date_started','expiration_date','creditcard_last_4','setup_domain','hosting_ID'];
  $scope.$location = '/service/hosting';

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
    limit: '15',
    order: 'hosting_name',
    page: 1
  };

  $scope.dbTableInfo = {
    db_table:'hosting',
    db_ID:'hosting_ID',
    //table:hosting_table,
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
      templateUrl: 'inc/delete.html',
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

  $scope.changeCellText = changeCellServices.changeCellText;

  $scope.changeDate = changeCellServices.changeDate;

  $scope.changeDropdown = changeCellServices.changeDropdown;

  $scope.changeSwitchValue = changeCellServices.changeSwitchValue;
    $scope.bulkDownload = upDownloadService.bulkDownload;


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


}]);
