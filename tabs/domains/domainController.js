
angular.module('SE_App').controller('domainController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http','$mdToast',
'$q','changeCellServices','upDownloadService',
function ($mdDialog, $domains, $scope, $mdEditDialog, $http,$mdToast,$q,changeCellServices,upDownloadService) {
  'use strict';

  var bookmark;
  $scope.$file = 'domains.csv';
  $scope.$header = ['domain_name','ip_address','nameserver_1','ns1_IP','nameserver_2','ns2_IP','nameserver_3','ns3_IP','date_purchased','expiration_date','registrar_ID','hosting_ID','registrar_301','registrar_301_target','whois_protected','domain_ID','registrar_name','hosting_name'];
    $scope.$location = '/service/domains';

    $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'domains'){
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
    order: 'domain_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'domains',
    db_ID:'domain_ID',
    //table:hosting_table,
  };

  function success(domains_tables) {
    angular.forEach(domains_tables.data,function(row){
      // row.d
      var date_purchased_parts = row.date_purchased.split("-");
      row.date_purchased = new Date(parseInt(date_purchased_parts[0]),
                                    parseInt(date_purchased_parts[1])-1,
                                    parseInt(date_purchased_parts[2]));
      var expiration_date_parts = row.expiration_date.split("-");
      row.expiration_date = new Date(parseInt(expiration_date_parts[0]),
                                    parseInt(expiration_date_parts[1])-1,
                                    parseInt(expiration_date_parts[2]));
    });
    $scope.domains_tables = domains_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addDomainController',
      controllerAs: 'ctrl',
	  skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/domains/addDomainDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteDomainController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { domains_tables: $scope.selected },
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $domains.domains_tables.get($scope.query, success).$promise;
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

$scope.date_purchased = function(domains_table){
	var dateFromDataBase = domains_table.date_purchased;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};

$scope.expiration_date = function(domains_table){
	var dateFromDataBase = domains_table.expiration_date;
	dateFromDataBase = new Date(dateFromDataBase);
	return dateFromDataBase;
	};

$scope.getHostsFunc = function(){
	$http.get('service/gethosts')
.then(function(response){
	$scope.getHosts = response.data;
	});
};

$scope.getRegistrarsFunc = function(){
	$http.get('service/getregistrars')
		.then(function(response){
	$scope.getRegistrars = response.data;
	});
};

}]);
