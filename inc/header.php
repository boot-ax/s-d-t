<?php
    include 'request_login.php';
    $opts = array(
        'id_entry' => 'duSWnS1sW', //differentiate multiple entries, use random string (required)
        'title' => 'WebWright   Zipps', // Title shown in page, default is 'Login'
        'usr_pwd' => array('jkolnik'=>'KolnikLives4','13thfletch'=>'cowboy25'), // user name and password pairs (at least one required)
        'duration' => 100,// how long (hours) to make it valid (default: 72 )
        'background_img'=> 'media/cover.jpg', //background image (default: NULL)
      );
    $login = new request_login();
    $login->load($opts);
include "inc/functions.php";

?>

<html lang="en" ng-app="SE_App">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="noindex">
    <meta name="description" content="WebWright's Data Collection Software">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
 <?php echo("<title>" . $title . "</title>") ;?>

<!--CSS-->

	<!--Angular-->
        <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
        <!-- <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.blue-orange.min.css">
     		<link rel="stylesheet" href="https://cdn.rawgit.com/CreativeIT/getmdl-select/master/getmdl-select.min.css"> -->
        <link href="css/angular-material.min.css" rel="stylesheet" type="text/css"/>
        <link href="bower_components/angular-material-data-table/dist/md-data-table.min.css" rel="stylesheet" type="text/css"/>
        <!-- <link href="css/MaterialDesign-Webfont-master/css/materialdesignicons.min.css" media="all" rel="stylesheet" type="text/css" /> -->
        <!-- <link href="css/icons.css" rel="stylesheet" type="text/css"/> -->
        <link href="css/app.css" rel="stylesheet" type="text/css"/>
	<!--bootstrap
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->
	<!--mdl-select-->
	<!--mystuff-->
		<link rel="stylesheet" href="css/styles.css" />


<!--javaScript-->

	<!--jquery-->
	<script
			  src="https://code.jquery.com/jquery-3.1.1.min.js"
			  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
			  crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js"></script>
   <!--bootstrap
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/js/bootstrap-select.min.js"></script>-->
   <!--mdl-select-->
   		<!-- <script defer src="https://cdn.rawgit.com/CreativeIT/getmdl-select/master/getmdl-select.min.js"></script>
   		<script defer id="reloadScript" src="https://code.getmdl.io/1.2.1/material.min.js"></script> -->
   <!--mystuff-->
		<script type="text/javascript" src="javascript/table-jQuery.js"></script>

</head>
<body ng-controller="BaseController">
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      	<!-- Title -->

        <nav class="mdl-navigation">
      <span class="mdl-layout-title"><a href="index.php">Zipps Management</a></span>
    </div></nav>
