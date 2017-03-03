<?php
// include('session.php');
// if(!isset($_SESSION['email'])){
// header("Location: login.php");
//  exit();
//  }
 // include('user_detail.php');
 ?>
<html>

        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="robots" content="noindex">
            <meta name="description" content="WebWright's Data Collection Software">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
         		<title>WebWright Data Management</title>
            <base href="/">
        	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link href="css/angular-material.min.css" rel="stylesheet" type="text/css"/>
            <link href="bower_components/angular-loading-bar/build/loading-bar.css" rel="stylesheet" type="text/css"/>
            <link href="css/md-data-table.min.css" rel="stylesheet" type="text/css"/>
            <link href="css/app.css" rel="stylesheet" type="text/css"/>
        		<link rel="stylesheet" href="css/styles.css" />
            <!-- <link rel="stylesheet" type="text/css" href="css/global.css">
            <link rel="stylesheet" type="text/css" href="css/fg-main-style.css"> -->
        </head>


        <body ng-app="SE_App" layout="column">
            <div ui-view></div>
        		<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
        		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
            <script src="https://cdn.rawgit.com/zenorocha/clipboard.js/master/dist/clipboard.min.js"></script>
        		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js"></script>
        		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-aria.min.js"></script>
        		<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-sanitize.min.js"></script>
            <script type="text/javascript" src="scripts/ngclipboard.min.js"></script>
        		<script type="text/javascript" src="scripts/angular-messages.min.js"></script>
        		<script src="https://code.angularjs.org/1.6.0/angular-resource.min.js"></script>
        		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>
            <!-- <script type="text/javascript" src="scripts/fixed-table-header.min.js"></script> -->
            <script type="text/javascript" src="bower_components/satellizer/dist/satellizer.js"></script>
            <script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
            <script type="text/javascript" src="bower_components/angular-loading-bar/build/loading-bar.js"></script>

            <script type="text/javascript" src="scripts/md-data-table.js"></script>

        		<script type="text/javascript" src="scripts/app.js"></script>
            <script type="text/javascript" src="scripts/authcontroller.js"></script>
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
            <script type="text/javascript" src="tabs/softwareKeys/software_keysHelpers.js"></script>
            <script type="text/javascript" src="tabs/softwareKeys/software_keysController.js"></script>
            <script type="text/javascript" src="tabs/urlData/url_dataHelpers.js"></script>
            <script type="text/javascript" src="tabs/urlData/url_dataController.js"></script>
            <script type="text/javascript" src="scripts/authorizeResource.js"></script>


        </body>
        </html>
