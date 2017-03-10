angular.module('SE_App').factory('$person', ['$resource', function ($resource) {
  'use strict';

  return {
    person_tables: $resource('/service/person')
  };
}]);

//===========================================================

angular.module('SE_App').controller('addPersonController', ['$mdDialog', '$person', '$scope' , '$http', '$mdToast', function ($mdDialog, $person, $scope, $http,$mdToast) {
  'use strict';

$scope.myDate = new Date();

$scope.getPersonsFunc = function(){
	$http.get('service/getpersons')
		.then(function(response){
	$scope.getPersons = response.data;
	});
};

  this.cancel = $mdDialog.cancel;

  function success(person_table) {
    $mdToast.show(
        $mdToast.simple()
          .textContent('New Content Added')
          .hideDelay(3000)
      );
    $mdDialog.hide(person_table);
  }

    function fedup(data){
  	//console.log('FAILED!',data);
	$mdToast.show(
      $mdToast.simple()
        .textContent(data.data)
        .hideDelay(3000)
    );
  }

  this.addItem = function () {
    $scope.item.form.$setSubmitted();

    if($scope.item.form.$valid) {
      $person.person_tables.save({person_table: $scope.person_table}, success, fedup);
    }
  };

}]);

// =======================================================

angular.module('SE_App').controller('deletePersonController', ['$authorize', 'person_tables', '$mdDialog', '$person', '$scope', '$q', function ($authorize, person_tables, $mdDialog, $person, $scope, $q) {
  'use strict';

  this.cancel = $mdDialog.cancel;

  function deleteDessert(person_table, index) {
    var deferred = $person.person_tables.remove({id: person_table.user_ID});

    deferred.$promise.then(function () {
      person_tables.splice(index, 1);
    });

    return deferred.$promise;
  }

  function onComplete() {
    $mdDialog.hide();
  }

  function error() {
    $scope.error = 'Invalid secret.';
  }

  function success() {
    $q.all(person_tables.forEach(deleteDessert)).then(onComplete);
  }

  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };

}]);

// =======================================================

angular.module('SE_App').controller('getPwrdController', ['$mdDialog', '$person', '$scope','changeCellServices','$object','$http','$q','$mdToast', function ($mdDialog, $person, $scope,changeCellServices,$object,$http,$q,$mdToast) {
  'use strict';
$scope.$email = $object.email;
console.log($object.value);

this.cancel = function (){
  $mdDialog.hide();
}

$scope.isHidden = $object.value;

  this.submitPwrd = function () {
    $scope.pwrd.form.$setSubmitted();
    $object.pwrd = $scope.pwrd.user_password;

    changeDropdown();

  };

  function changeDropdown(){
                  var success  = function(data){
                      $mdToast.show(
                          $mdToast.simple()
                            .textContent(data.data)
                            .hideDelay(3000)
                        );
                        $mdDialog.hide();
                    };

                    var failure  = function(data){
                      $mdToast.show(
                          $mdToast.simple()
                            .textContent(data.data)
                            .hideDelay(3000)
                        );
                    };

                  var deferred = $q.defer();

                $http.post('service/updateItem',$object).then(function(response){
                  success(response);
                  deferred.resolve();
                },function(response){
                  failure(response);
                  deferred.reject();
                });
                return deferred.promise;
                };

}]);
