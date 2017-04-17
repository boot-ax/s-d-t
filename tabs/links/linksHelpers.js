angular.module('SE_App').factory('$links', ['$resource', function ($resource) {
  'use strict';

  return {
    links_tables: $resource('/service/links')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addLinksController', ['$mdDialog', '$links', '$scope' , '$http', '$q','$mdToast',function ($mdDialog, $links, $scope, $http, $q, $mdToast) {
  'use strict';

$scope.myDate = null;

$scope.getLinksFunc = function(){
	$http.get('service/getlinks')
		.then(function(response){
	$scope.getLinks = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(links_table) {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'New Content Added';
           }
         }
      });
    $mdDialog.hide(links_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
  }


  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.links_table);
    if(data.date_created == null){
      data.date_created = null;
    } else {
    data.date_created = data.date_created.getFullYear()+"-"+
                          ("0"+(data.date_created.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_created.getDate()).slice(-2);
          }
    if($scope.item.form.$valid) {
      $links.links_tables.save({links_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteLinksController', ['$authorize', 'links_tables', '$mdDialog', '$links', '$scope', '$q', '$mdToast',function ($authorize, links_tables, $mdDialog, $links, $scope, $q,$mdToast) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(links_table, index) {
    var deferred = $links.links_tables.remove({id: links_table.link_ID}, success, error);


    deferred.$promise.then(function () {
      links_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function success() {
    $mdToast.show({
      hideDelay   : 4000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastSuccess',
      resolve: {
           $response: function () {
             return 'Successfully Deleted';
           }
         }
      });
    }

  function error(response) {
    $mdToast.show({
      hideDelay   : 9000,
      position    : 'top center',
      controller  : 'ToastCtrl',
      templateUrl : '/partials/toast-template.html',
      toastClass  : 'toastDanger',
      resolve: {
           $response: function () {
             return response.data;
           }
         }
      });
    }
    this.authorizeUser = function () {
      $q.all(links_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
