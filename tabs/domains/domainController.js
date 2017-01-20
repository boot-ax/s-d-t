
angular.module('SE_App').controller('domainController', ['$mdDialog','$domains', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $domains, $scope, $mdEditDialog, $http) {
  'use strict';

  var bookmark;

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
    limit: '5',
    order: 'domain_name',
    page: 1
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
      templateUrl: 'tabs/domains/deleteDomainDialog.html',
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

    $scope.changeCellText = function (event, table, column, $length) {
    event.stopPropagation();

    var promise = $mdEditDialog.small({
      modelValue: table[column],

      save: function (input) {
        table[column] = input.$modelValue;
        var $obj = {};
        $obj.table = 'domains';
        $obj.column = column;
        $obj.value = table[column];
        $obj.identifier = 'domain_ID';
        $obj.id = table.domain_ID;
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

$scope.changeDropdown = function(column, table){
var $obj = {};
$obj.table = 'domains';
	  $obj.column = column;
	  $obj.value = table[column];
	  $obj.identifier = 'domain_ID';
	  $obj.id = table.domain_ID;

$http.post('/service/updateItem', $obj);
};

 $scope.ChangeSwitchValue = function(column, table){
 	  var $obj = {};
    $obj.table = 'domains';
    $obj.column = column;
    $obj.value = table[column];
    $obj.identifier = 'domain_ID';
    $obj.id = table.domain_ID;
    $http.post('/service/updateItem', $obj);
  };

$scope.changeDate = function(column, table){
    var $obj = {};
    $obj.table = 'domains';
    $obj.column = column;
    $obj.value = table[column];
    $obj.value = table[column].getFullYear()+"-"+
    ("0"+(table[column].getMonth()+1)).slice(-2)+"-"+
    ("0"+table[column].getDate()).slice(-2);
    $obj.identifier = 'domain_ID';
    $obj.id = table.domain_ID;
    $http.post('/service/updateItem', $obj);
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
