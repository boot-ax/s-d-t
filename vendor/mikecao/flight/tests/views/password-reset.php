<?php
$body ='<div class="box" layout="row" layout-align="center center">
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
		                   <input name="newPassword" type="password" ng-model="reset.password">
		                 </md-input-container>
		               </div>
		               <div>
		                 <md-input-container class="input-row layout-row rowOffset">
		                     <label class="loginLabel">Confirm Password&#42;</label>
		                     <md-icon class="material-icons iconOff">lock_outline</md-icon>
		                     <input match-password="newPassword" type="password" name="confirmPassword" ng-model="reset.password2">
		                   </md-input-container>
		             </div>
								 <section style="margin-top:20px" layout="row" layout-align="center center">
						 			<md-button ng-disabled="item.form.$invalid" class="md-raised md-primary" ng-click="passwordReset(reset)">Reset Password</md-button>
							 </section>
		         </div>
		       <span flex></span>
		     </form>
	</md-card>
</div>';

echo $body;

?>
