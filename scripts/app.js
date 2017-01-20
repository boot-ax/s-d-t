//angular.module('se_management', ['ngMaterial', 'md.data.table','ngResource']);

angular.module('SE_App', ['ngMaterial', 'md.data.table', 'ngResource', 'ngRoute'])

  .config(['$compileProvider', '$mdThemingProvider','$mdAriaProvider','$routeProvider','$locationProvider', function ($compileProvider, $mdThemingProvider,$mdAriaProvider,$routeProvider, $locationProvider) {
    'use strict';
    $mdAriaProvider.disableWarnings();
    $compileProvider.debugInfoEnabled(false);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

    $routeProvider
     .when('/domains', {
       templateUrl: 'tabs/domains/domains.html',
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
