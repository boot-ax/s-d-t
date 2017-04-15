'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  // uglify = require('gulp-minify'),

  rename = require('gulp-rename');

gulp.task("concatScripts", function(){
  gulp.src([
  "node_modules/moment/moment.js",
  // "node_modules/angular-material/angular-material.js",
  "node_modules/ng-csv/build/ng-csv.js",
  "node_modules/angular-sanitize/angular-sanitize.js",
  "bower_components/jquery/dist/jquery.js",
    "node_modules/ngclipboard/dist/ngclipboard.js",
    "bower_components/satellizer/dist/satellizer.js",
    "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/angular-loading-bar/build/loading-bar.js",
    "bower_components/angular-password/angular-password.js",
    "scripts/md-data-table.js",
    "scripts/app.js",
    "scripts/authcontroller.js",
    "scripts/stripe-mailgun-authyController.js",
    "node_modules/angular-stripe-checkout/angular-stripe-checkout.js",
    "tabs/domains/domainHelpers.js",
    "tabs/domains/domainController.js",
    "tabs/hosting/hostingHelpers.js",
    "tabs/hosting/hostingController.js",
    "tabs/registrar/registrarHelpers.js",
    "tabs/registrar/registrarController.js",
    "tabs/w2Accounts/W2_AccountsHelpers.js",
    "tabs/w2Accounts/W2_AccountsController.js",
    "tabs/person/personHelpers.js",
    "tabs/person/personController.js",
    "tabs/cmsLogin/cms_loginHelpers.js",
    "tabs/cmsLogin/cms_loginController.js",
    "tabs/resourceLogin/resource_loginHelpers.js",
    "tabs/resourceLogin/resource_loginController.js",
    "tabs/links/linksHelpers.js",
    "tabs/links/linksController.js",
    "tabs/changeLog/change_logHelpers.js",
    "tabs/changeLog/change_logController.js",
    "tabs/softwareKeys/software_keysHelpers.js",
    "tabs/softwareKeys/software_keysController.js",
    "tabs/urlData/url_dataHelpers.js",
    "tabs/urlData/url_dataController.js",
    "scripts/authorizeResource.js",
    "scripts/profile.js"
  ])
  .pipe(concat('app.js'))
  .pipe (gulp.dest('dist/js'));
});

gulp.task('minifyScripts', function(){
  gulp.src('dist/js/app.js')
    .pipe(uglify({mangle: false}))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['hello'], function(){
  console.log('Shit. this is the default');
});
