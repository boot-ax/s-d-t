angular.module('SE_App').controller('cms_loginController', ['$mdDialog','$cms_login', '$scope', '$mdEditDialog', '$http',function ($mdDialog, $cms_login, $scope, $mdEditDialog, $http) {
  'use strict';

  var bookmark;

      $scope.$on('locationUpdate', function (event, data) {
	  if(data.location == 'cms_login'){
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
    order: 'install_site_url_name',
    page: 1
  };

  function success(cms_login_tables) {
    $scope.cms_login_tables = cms_login_tables;
  }

  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addCMSController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'tabs/cmsLogin/addCms_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteCMSController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { cms_login_tables: $scope.selected },
      templateUrl: 'tabs/cmsLogin/deleteCms_loginDialog.html',
    }).then($scope.getDesserts);
  };

  $scope.getDesserts = function () {
    $scope.promise = $cms_login.cms_login_tables.get($scope.query, success).$promise;
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

  $scope.editInstallSiteUrlName = function (event, cms_login_table, column) {
  event.stopPropagation();

  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.install_site_url_name,

    save: function (input) {
	  cms_login_table.install_site_url_name = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.install_site_url_name;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 382
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editLoginUrl = function (event, cms_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.login_url,
    save: function (input) {
	  cms_login_table.login_url = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.login_url;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });
    promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editUsername = function (event, cms_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.username,
    save: function (input) {
	  cms_login_table.username = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.username;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

$scope.editPassword = function (event, cms_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.password,
    save: function (input) {
	  cms_login_table.password = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.password;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });
    promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editEmail = function (event, cms_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.recovery_email,
    save: function (input) {
	  cms_login_table.recovery_email = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.recovery_email;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

$scope.editCpanelUrl = function (event, cms_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.cpanel_url,
    save: function (input) {
	  cms_login_table.cpanel_url = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.cpanel_url;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });
    promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

  $scope.editCpanelUsername = function (event, cms_login_table, column) {
  event.stopPropagation();
  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.cpanel_username,
    save: function (input) {
	  cms_login_table.cpanel_username = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.cpanel_username;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};

$scope.editCpanelPassword = function (event, cms_login_table, column) {
  event.stopPropagation();

  var promise = $mdEditDialog.small({
    modelValue: cms_login_table.cpanel_password,
    save: function (input) {
	  cms_login_table.cpanel_password = input.$modelValue;
	  var $obj = {};
	  $obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.cpanel_password;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;
	  $http.post('service/updateItem',$obj);
    },
    targetEvent: event,
    validators: {
      'md-maxlength': 255
    },
  });

  promise.then(function (ctrl) {
    var input = ctrl.getInput();
    input.$viewChangeListeners.push(function () {
      input.$setValidity('test', input.$modelValue !== 'test');
    });
  });
};





$scope.changeDomainValue = function(column, cms_login_table){
var $obj = {};
$obj.table = 'cms_login';
	  $obj.column = column;
	  $obj.value = cms_login_table.domain_name;
	  $obj.identifier = 'install_site_url_ID';
	  $obj.id = cms_login_table.install_site_url_ID;

$http.post('/service/updateItem', $obj);
};


$scope.getDomainsFunc = function(){
	$http.get('service/getdomains')
.then(function(response){
	$scope.getDomains = response.data;
	});
};

}]);
