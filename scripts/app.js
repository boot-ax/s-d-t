//angular.module('se_management', ['ngMaterial', 'md.data.table','ngResource']);

angular.module('SE_App', ['ngMaterial', 'md.data.table', 'ngResource', 'ngRoute','ngclipboard','ngSanitize', 'ngCsv'])

  .config(['$compileProvider', '$mdThemingProvider','$mdAriaProvider','$routeProvider','$locationProvider', function ($compileProvider, $mdThemingProvider,$mdAriaProvider,$routeProvider, $locationProvider) {
    'use strict';
    $mdAriaProvider.disableWarnings();
    $compileProvider.debugInfoEnabled(false);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

    $routeProvider
     .when('/domains', {
       templateUrl: '/tabs/domains/domains.html/',
       controller: 'domainController'
     })
     .when('/hosting', {
        templateUrl: 'tabs/hosting/hosting.html',
        controller: 'hostingController'
      })
      .when('/registrar', {
        templateUrl: 'tabs/registrar/registrar.html',
        controller: 'registrarController'
       })
       .when('/w2-accounts', {
         templateUrl: 'tabs/w2Accounts/W2_Accounts.html',
         controller: 'W2_accountsController'
        })
        .when('/people', {
          templateUrl: 'tabs/person/person.html',
          controller: 'personController'
         })
         .when('/cms-login', {
           templateUrl: 'tabs/cmsLogin/cms_login.html',
           controller: 'cms_loginController'
          })
          .when('/resources', {
            templateUrl: 'tabs/resourceLogin/resource_login.html',
            controller: 'resource_loginController'
           })
           .when('/links', {
             templateUrl: 'tabs/links/links.html',
             controller: 'linksController'
            })
			.when('/change-log', {
             templateUrl: 'tabs/changeLog/change_log.html',
             controller: 'change_logController'
            })
     .otherwise({
        redirectTo: '/domains'
      });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
  }])
.service('upDownloadService',function($q,$http,$mdToast,$mdDialog){

  this.bulkDownload = function (event,$current_data,$file_name,$header,$location) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'bulkDownloadController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'inc/bulk_download.html',
      resolve: {
           tableData: function () {
             return $current_data;
           },
           file_name: function(){
             return $file_name;
           },
           header: function(){
             return $header;
           },
           location: function(){
             return $location;
           }
         }
    });
  };
})

  .service('changeCellServices',function($mdEditDialog,$q,$http,$mdToast){

    this.changeCellText = function (event, table, column,db_table,db_ID,$length) {
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

        var promise = $mdEditDialog.large({

          modelValue: table[column],
          save: function (input) {
            var deferred = $q.defer();
            table[column] = input.$modelValue;
            var $obj = {};
            $obj.table = db_table;
            $obj.column = column;
            $obj.value = table[column];
            $obj.identifier = db_ID;
            $obj.id = table[db_ID];
            $http.post('/service/updateItem/',$obj).then(function(response){
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


      this.changeDate = function(column, table,db_table,db_ID){
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

          var deferred = $q.defer();
          var $obj = {};
          $obj.table = db_table;
          $obj.column = column;
          $obj.value = table[column];
          $obj.value = table[column].getFullYear()+"-"+
          ("0"+(table[column].getMonth()+1)).slice(-2)+"-"+
          ("0"+table[column].getDate()).slice(-2);
          $obj.identifier = db_ID;
          $obj.id = table[db_ID];
          $http.post('service/updateItem',$obj).then(function(response){
            success(response);
            deferred.resolve();
          },function(response){
            failure(response);
            deferred.reject();
          });
          return deferred.promise;
        };


        this.changeDropdown = function(column, value, table,db_table,db_ID){
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

        var deferred = $q.defer();
        var $obj = {};
        $obj.table = db_table;
            $obj.column = column;
            $obj.value = table[value];
            $obj.identifier = db_ID;
            $obj.id = table[db_ID];

            $http.post('service/updateItem',$obj).then(function(response){
              success(response);
              deferred.resolve();
            },function(response){
              failure(response);
              deferred.reject();
            });
            return deferred.promise;

            };

            this.changeSwitchValue = function(column, table,db_table,db_ID){
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

               var deferred = $q.defer();
               var $obj = {};
               $obj.table = db_table;
               $obj.column = column;
               $obj.value = table[column];
               $obj.identifier = db_ID;
               $obj.id = table[db_ID];
               $http.post('service/updateItem',$obj).then(function(response){
                 success(response);
                 deferred.resolve();
               },function(response){
                 failure(response);
                 deferred.reject();
               });
               return deferred.promise;
             };
  })
;


 angular.module('SE_App').controller('BaseController', ['$scope','$rootScope','$location', '$timeout', '$mdSidenav', function($scope,$rootScope,$location, $timeout, $mdSidenav){


	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

	$scope.data = {
      selectedIndex: 0,
    };
	$scope.$watch('data.selectedIndex', function(){
		if($scope.data.selectedIndex == 0){
			$location.path('/domains');
		}else if($scope.data.selectedIndex == 1){
			$location.path('/hosting');
		}else if($scope.data.selectedIndex == 2){
			$location.path('/registrar');
		}else if($scope.data.selectedIndex == 3){
			$location.path('/w2-accounts');
		}else if($scope.data.selectedIndex == 4){
			$location.path('/people');
		}else if($scope.data.selectedIndex == 5){
			$location.path('/cms-login');
		}else if($scope.data.selectedIndex == 6){
			$location.path('/resources');
		}else if($scope.data.selectedIndex == 7){
			$location.path('/links');
		}else if($scope.data.selectedIndex == 8){
			$location.path('/change-log');
		}

	});
}]);

angular.module('SE_App').controller('bulkDownloadController', ['$mdDialog','$scope' , '$http', '$q','$mdToast','tableData','file_name','header','location',function ($mdDialog, $scope, $http, $q, $mdToast,tableData,file_name,header,location) {
  'use strict';

this.$file = file_name;

this.$csv_header = header;

this.$location = location;


this.tableNew = function(){
    $mdDialog.hide();
    return tableData;
  };
  this.cancel = $mdDialog.cancel;

  this.bulkDownload = function () {

    var failure  = function(data){
      $mdToast.show(
          $mdToast.simple()
            .textContent(data.data)
            .hideDelay(3000)
        );
    };

    var $query = {
      all: 'true'
    };
var deferred = $q.defer();
$scope.promise = deferred.promise;
console.log('step one');
$http({
  method: 'GET',
  url: location,
  params:$query
}).then(function(response){
  //success(response);
  //console.log(response.data.data);
  deferred.resolve(response.data.data);
},function(response){
  failure(response);
  deferred.reject();
});
$mdDialog.hide();
console.log(deferred.promise);
return deferred.promise;
  };
}]);
