var gulp = require('gulp');
 
var jsFilesToMove = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/ng-facebook/ngFacebook.js',
  'bower_components/angular-ui-calendar/src/calendar.js',
  'bower_components/fullcalendar/fullcalendar.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/fullcalendar/dist/fullcalendar.min.js',
  'bower_components/moment/fullcalendar.min.js',
  'bower_components/materialize/dist/js/materialize.min.js',
  'bower_components/moment/min/moment-with-locales.min.js',
  'bower_components/mustache/mustache.min.js'
];
 
var cssFilesToMove = [
  'bower_components/fullcalendar/dist/fullcalendar.min.css',
  'bower_components/materialize/dist/css/materialize.min.css'
];
 
var fontsFilesToMove = [
  'bower_components/materialize/dist/fonts/**/*'
];
 

gulp.task('assets-dist', function() {
    gulp.src(jsFilesToMove)
        .pipe(gulp.dest('assets/components/js'));
    gulp.src(cssFilesToMove)
        .pipe(gulp.dest('assets/components/css'));
    gulp.src(fontsFilesToMove)
        .pipe(gulp.dest('assets/components/fonts'));
});
 
gulp.task('default', [ 'assets-dist' ]);
