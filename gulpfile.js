'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  maps   = require('gulp-sourcemaps'),
  sass   = require('gulp-sass'),
  // uglify = require('gulp-minify'),

  rename = require('gulp-rename');

gulp.task("concatScripts", function(){
  return gulp.src([
  "node_modules/moment/moment.js",
  // "node_modules/angular-material/angular-material.js",
  // "node_modules/ng-csv/build/ng-csv.js",
  // "node_modules/angular-sanitize/angular-sanitize.js",
    "bower_components/jquery/dist/jquery.js",
    "node_modules/ngclipboard/dist/ngclipboard.js",
    // "node_modules/clipboard/dist/clipboard.js",
    // "node_modules/angular-messages/angular-messages.js",
    "bower_components/satellizer/dist/satellizer.js",
    "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/angular-loading-bar/build/loading-bar.js",
    "bower_components/angular-password/angular-password.js",
    "scripts/md-data-table.js",
    "scripts/app.js",
    "scripts/authcontroller.js",
    "scripts/stripe-mailgun-authyController.js",
    "node_modules/angular-stripe-checkout/angular-stripe-checkout.js",
    "tabs/**/*.js",
    "scripts/authorizeResource.js",
    "scripts/profile.js",
    "scripts/help.js"



  ])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe (gulp.dest('dist/js'));
});

gulp.task('minifyScripts', ["concatScripts"], function(){
  return gulp.src('dist/js/app.js')
    .pipe(uglify({mangle: false}))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compileSass', function(){
  return gulp.src('scss/application.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task("build", ['minifyScripts']);

gulp.task('default', ['build']);
