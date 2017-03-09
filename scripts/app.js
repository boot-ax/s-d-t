angular.module('SE_App', ['ngMaterial', 'md.data.table', 'ngResource', 'ngRoute','ngclipboard','ngSanitize', 'ngCsv','satellizer','ui.router','angular-loading-bar'])
  .config(['$compileProvider', '$mdThemingProvider','$mdAriaProvider','$stateProvider', '$locationProvider','$urlRouterProvider','$authProvider','cfpLoadingBarProvider', function ($compileProvider, $mdThemingProvider,$mdAriaProvider, $stateProvider, $locationProvider,$urlRouterProvider,$authProvider,cfpLoadingBarProvider) {
    'use strict';
    // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

    $mdAriaProvider.disableWarnings();
    $compileProvider.debugInfoEnabled(false);
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

    $stateProvider
    .state('home', {
      abstract: true,
      templateUrl: 'partials/home.html',
      controller: 'BaseController',
      resolve: {
        loginRequired: loginRequired
      }
    })
     .state('home.domains', {
       url:'/domains',
       templateUrl: 'tabs/domains/domains.html',
       controller: 'domainController',
       resolve: {
         loginRequired: loginRequired
       }
     })
     .state('home.hosting', {
        url: '/hosting',
        templateUrl: 'tabs/hosting/hosting.html',
        controller: 'hostingController',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('home.registrar', {
        url:'/registrar',
        templateUrl: 'tabs/registrar/registrar.html',
        controller: 'registrarController',
        resolve: {
          loginRequired: loginRequired
        }
       })
       .state('home.web2', {
         url:'/web2.0',
         templateUrl: 'tabs/w2Accounts/W2_Accounts.html',
         controller: 'W2_accountsController',
         resolve: {
           loginRequired: loginRequired
         }
        })
        .state('home.people', {
          url: '/people',
          templateUrl: 'tabs/person/person.html',
          controller: 'personController',
          resolve: {
            loginRequired: loginRequired
          }
         })
         .state('home.cms-login', {
           url: '/cms-login',
           templateUrl: 'tabs/cmsLogin/cms_login.html',
           controller: 'cms_loginController',
           resolve: {
             loginRequired: loginRequired
           }
          })
          .state('home.resources', {
            url: '/resources',
            templateUrl: 'tabs/resourceLogin/resource_login.html',
            controller: 'resource_loginController',
            resolve: {
              loginRequired: loginRequired
            }
           })
           .state('home.links', {
             url: '/links',
             templateUrl: 'tabs/links/links.html',
             controller: 'linksController',
             resolve: {
               loginRequired: loginRequired
             }
            })
            .state('home.url-data', {
              url: '/url-data',
                   templateUrl: 'tabs/urlData/url_data.php',
                   controller: 'url_dataController',
                   resolve: {
                     loginRequired: loginRequired
                   }
                  })
			.state('home.change-log', {
        url: '/change-log',
             templateUrl: 'tabs/changeLog/change_log.html',
             controller: 'change_logController',
             resolve: {
               loginRequired: loginRequired
             }
            })
            .state('home.software-keys', {
              url: '/software-keys',
                   templateUrl: 'tabs/softwareKeys/software_keys.html',
                   controller: 'software_keysController',
                   resolve: {
                     loginRequired: loginRequired
                   }
                  })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'signupController'
      });

      $authProvider.loginUrl = '/service/auth/login';

      $urlRouterProvider.otherwise('/domains');

      function loginRequired($q, $location, $auth){
        var defer = $q.defer();
        if($auth.isAuthenticated()){
          defer.resolve();
        }else{
          $location.path('/login');
        }
        return defer.promise;
      }

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
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

  .service('changeCellServices',function($mdEditDialog,$q,$http,$mdToast,$mdDialog){

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

              var $obj = {};
              $obj.table = db_table;
              $obj.column = column;
              $obj.value = table[value];
              $obj.identifier = db_ID;
              $obj.id = table[db_ID];

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
  });


 angular.module('SE_App').controller('BaseController', ['$scope','$rootScope','$location', '$timeout', '$mdSidenav','$auth','$location', function($scope,$rootScope,$location, $timeout, $mdSidenav,$auth,$location){

   $scope.payload = JSON.parse($auth.getPayload().sub);




$scope.logout = function(){

  $auth.logout();
  $location.path('/login');
}

$scope.userSettings = function(){

}

	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.tabClicked = function(){
      // console.log('Change paths');
      if($scope.data.selectedIndex == 0){
  			$location.path('/domains');
  		}else if($scope.data.selectedIndex == 1){
  			$location.path('/hosting');
  		}else if($scope.data.selectedIndex == 2){
  			$location.path('/registrar');
  		}else if($scope.data.selectedIndex == 3){
  			$location.path('/web2.0');
  		}else if($scope.data.selectedIndex == 4){
  			$location.path('/people');
  		}else if($scope.data.selectedIndex == 5){
  			$location.path('/cms-login');
  		}else if($scope.data.selectedIndex == 6){
  			$location.path('/resources');
  		}else if($scope.data.selectedIndex == 7){
  			$location.path('/links');
      }else if($scope.data.selectedIndex == 8){
        $location.path('/software-keys');
      }else if($scope.data.selectedIndex == 9){
    			$location.path('/url-data');
  		}else if($scope.data.selectedIndex == 10){
  			$location.path('/change-log');
  		}
    };

	$scope.data = {
      selectedIndex: 0,
    };

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
