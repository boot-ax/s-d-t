<!doctype html>
<html lang="en" ng-app="reset_App">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="robots" content="noindex">
	<meta name="description" content="WebWright's Data Collection Software">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>WebWright Data Management</title>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="views/angular-material.min.css" rel="stylesheet" type="text/css"/>
	<link href="views/loading-bar.min.css" rel="stylesheet" type="text/css"/>

	<link rel="stylesheet" href="views/styles.css" />

</head>
<body ng-controller="password-resetController">
<div class="box" layout="row" layout-align="center center">
	<!-- <md-card layout="column" ng-show="busy" layout-align="center center">
		<md-progress-circular md-mode="indeterminate"></md-progress-circular>
	</md-card> -->

<md-card class="login-form" ng-hide="busy" layout="column" layout-align="center center">
		<md-toolbar>
		<div class="md-toolbar-tools">
			<h2>Lōgïn Password Reset</h2>
			<span flex></span>
			<md-button class="md-icon-button" ng-click="cancel()">
				<md-icon class="material-icons" aria-label="Close dialog">close</md-icon>
			</md-button>
		</div>
	</md-toolbar>
		       <form layout="row" name="item.form" style="padding:15px">
		         <span flex></span>
		           <div layout="column">
		             <div>
		               <md-input-container layout="row" class="input-row layout-row rowOffset">
		                   <label class="loginLabel">Password&#42;</label>
		                   <md-icon class="material-icons iconOff">lock</md-icon>
		                   <input name="newPassword" type="password" ng-model="user.password" required>
		                 </md-input-container>
		               </div>
		               <div>
		                 <md-input-container class="input-row layout-row rowOffset">
		                     <label class="loginLabel">Confirm Password&#42;</label>
		                     <md-icon class="material-icons iconOff">lock_outline</md-icon>
		                     <input match-password="newPassword" type="password" name="confirmPassword" ng-model="user.password2">
		                   </md-input-container>
		             </div>
								 <section style="margin-top:20px" layout="row" layout-align="center center">
						 			<md-button ng-disabled="item.form.$invalid" class="md-raised md-primary" ng-click="passwordReset(user,'<?php echo $token ?>')">Reset Password</md-button>
							 </section>
		         </div>
		       <span flex></span>
		     </form>
	</md-card>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<script src="https://cdn.rawgit.com/zenorocha/clipboard.js/master/dist/clipboard.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-animate.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-aria.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular-sanitize.min.js"></script>
<script src="https://code.angularjs.org/1.6.0/angular-resource.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>

<script type="text/javascript" src="views/app.js"></script>
<script type="text/javascript" src="views/angular-password.min.js"></script>
<script type="text/javascript" src="views/loading-bar.min.js"></script>

</body>
</html>
