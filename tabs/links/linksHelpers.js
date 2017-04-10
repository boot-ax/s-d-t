angular.module('SE_App').factory('$links', ['$resource', function ($resource) {
  'use strict';

  return {
    links_tables: $resource('/service/links')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addLinksController', ['$mdDialog', '$links', '$scope' , '$http', '$q','ngToast',function ($mdDialog, $links, $scope, $http, $q, ngToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getLinksFunc = function(){
	$http.get('service/getlinks')
		.then(function(response){
	$scope.getLinks = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(links_table) {
    ngToast.create({
      className: 'success',
      content: 'New Content Added',
      dismissButton: 'true'
      });
    $mdDialog.hide(links_table);
  }

    function fedup(response){
  	//console.log('FAILED!',data);
    ngToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
  }


  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    var data = angular.copy($scope.links_table);
    data.date_created = data.date_created.getFullYear()+"-"+
                          ("0"+(data.date_created.getMonth()+1)).slice(-2)+"-"+
                          ("0"+data.date_created.getDate()).slice(-2);


    if($scope.item.form.$valid) {
      $links.links_tables.save({links_table: data}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deleteLinksController', ['$authorize', 'links_tables', '$mdDialog', '$links', '$scope', '$q', 'ngToast',function ($authorize, links_tables, $mdDialog, $links, $scope, $q,ngToast) {
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
    ngToast.create({
      className: 'success',
      content: 'Successfully Deleted',
      dismissButton: 'true'
      });
    }

  function error(response) {
    ngToast.create({
      className: 'danger toasthome',
      content: response.data,
      dismissButton: 'true',
      timeout: 9000
      });
    }
    this.authorizeUser = function () {
      $q.all(links_tables.forEach(deleteDessert)).then(onComplete);
    };

  }]);
