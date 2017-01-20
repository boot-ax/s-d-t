<?php
    include 'request_login.php';
    $opts = array(
        'id_entry' => 'duSWnS1sW', //differentiate multiple entries, use random string (required)
        'title' => 'WebWright   Zipps', // Title shown in page, default is 'Login'
        'usr_pwd' => array('jkolnik'=>'KolnikLives4','13thfletch'=>'MulchaTNA1313','jberiault'=>')377}.%/2=E^','syoung'=>'8[%]4}48a);+'), // user name and password pairs (at least one required)
        'duration' => 100,// how long (hours) to make it valid (default: 72 )
        'background_img'=> 'media/cover.jpg', //background image (default: NULL)
      );
    $login = new request_login();
    $login->load($opts);
include "inc/functions.php";

?>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="noindex">
    <meta name="description" content="WebWright's Data Collection Software">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
 		<title>WebWright Data Management</title>

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="css/angular-material.min.css" rel="stylesheet" type="text/css"/>
    <link href="css/md-data-table.min.css" rel="stylesheet" type="text/css"/>
    <link href="css/app.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="css/styles.css" />
</head>
<body ng-app="SE_App" layout="column" ng-controller="BaseController">
	<md-toolbar>
    <div layout="row">
    <button class="md-icon-button md-button md-ink-ripple" type="button" ng-click="toggleLeft()">
      <i class="material-icons">menu</i>
    </button>


          <h3>Zipps Management</h3>
          </div>
          </md-toolbar>
	<div flex layout="row">
	<div layout="column" flex>
		<md-tabs md-selected="data.selectedIndex">
		  <md-tab label="Domains"></md-tab>
		  <md-tab label="Hosting"></md-tab>
		  <md-tab label="Registrar"></md-tab>
			<md-tab label="W2 Accounts"></md-tab>
      <md-tab label="People"></md-tab>
      <md-tab label="CMS Login"></md-tab>
      <md-tab label="Resource Login"></md-tab>
      <md-tab label="Links"></md-tab>
      <md-tab label="Change Log"></md-tab>
		</md-tabs>


    <md-sidenav class="md-sidenav-left" md-component-id="left" md-whiteframe="4">
      <md-toolbar class="md-theme-indigo">
        <h1 class="md-toolbar-tools">Choose Wisely</h1>
      </md-toolbar>
      <md-content layout-margin>
        <p class="md-accent">
          <a href="/jordan.php">Jordan's Method</a>
        </p>
      </md-content>
    </md-sidenav>






		<md-card>
		  <md-card-content ng-view />
		</md-card>
	</div>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-aria.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.js"></script>
		<script type="text/javascript" src="scripts/angular-messages.min.js"></script>
		<script src="https://code.angularjs.org/1.6.0/angular-resource.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>
		<script type="text/javascript" src="scripts/md-data-table.min.js"></script>
		<script type="text/javascript" src="scripts/app.js"></script>
    <script type="text/javascript" src="tabs/domains/domainHelpers.js"></script>
    <script type="text/javascript" src="tabs/domains/domainController.js"></script>
    <script type="text/javascript" src="tabs/hosting/hostingHelpers.js"></script>
    <script type="text/javascript" src="tabs/hosting/hostingController.js"></script>
    <script type="text/javascript" src="tabs/registrar/registrarHelpers.js"></script>
    <script type="text/javascript" src="tabs/registrar/registrarController.js"></script>
    <script type="text/javascript" src="tabs/w2Accounts/W2_AccountsHelpers.js"></script>
    <script type="text/javascript" src="tabs/w2Accounts/W2_AccountsController.js"></script>
    <script type="text/javascript" src="tabs/person/personHelpers.js"></script>
    <script type="text/javascript" src="tabs/person/personController.js"></script>
    <script type="text/javascript" src="tabs/cmsLogin/cms_loginHelpers.js"></script>
    <script type="text/javascript" src="tabs/cmsLogin/cms_loginController.js"></script>
    <script type="text/javascript" src="tabs/resourceLogin/resource_loginHelpers.js"></script>
    <script type="text/javascript" src="tabs/resourceLogin/resource_loginController.js"></script>
    <script type="text/javascript" src="tabs/links/linksHelpers.js"></script>
    <script type="text/javascript" src="tabs/links/linksController.js"></script>
    <script type="text/javascript" src="tabs/changeLog/change_logHelpers.js"></script>
    <script type="text/javascript" src="tabs/changeLog/change_logController.js"></script>
    <script type="text/javascript" src="scripts/authorizeResource.js"></script>


</body>
</html>
