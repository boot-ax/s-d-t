angular.module('SE_App').controller('personController', ['$mdDialog','$person', '$scope', '$mdEditDialog', '$http','$q','changeCellServices','upDownloadService','$mdToast',function ($mdDialog, $person, $scope, $mdEditDialog, $http,$q,changeCellServices,upDownloadService,$mdToast) {
  'use strict';

  var bookmark;
  $scope.$file = 'person.csv';
  $scope.$header = ['user_name','user_email','user_address','user_phone','user_type','user_ID'];

  $scope.$location = '/service/person';

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
    limit: '15',
    order: 'user_name',
    page: 1,
  };

  $scope.dbTableInfo = {
    db_table:'registration',
    db_ID:'user_ID',
    //table:hosting_table,
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
      templateUrl: 'inc/delete.html',
    }).then($scope.getDesserts);
  };

  $scope.addPwrd = function (event,$table,column,$value,db_table,db_ID,$email) {
    var $obj = {};
    $obj.email = $email;
    $obj.table = db_table;
    $obj.column = column;
    $obj.value = $table[$value];
    $obj.identifier = db_ID;
    $obj.id = $table[db_ID];
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'getPwrdController',
      controllerAs: 'ctrl',
      skipHide: true,
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: '/partials/pwrd.html',
      resolve:{
        $object: function(){
          return $obj;
        }
      }
    }).then($scope.getDesserts)
    ;
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


  $scope.changeCellText = changeCellServices.changeCellText;
    $scope.bulkDownload = upDownloadService.bulkDownload;

    $scope.getUserType = function(){
    	$http.get('service/getusertype')
    		.then(function(response){
    	$scope.getUserT = response.data;
    });
    };

}]);
