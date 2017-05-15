var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var watch = require('gulp-watch');
 
var jsFilesToMove = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/ng-facebook/ngFacebook.js',
  'bower_components/ng-file-upload/ng-file-upload.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/materialize/dist/js/materialize.min.js',
  'bower_components/moment/min/moment-with-locales.min.js'
];
 
var cssFilesToMove = [
  'bower_components/materialize/dist/css/materialize.min.css'
];
 
var fontsFilesToMove = [
  'bower_components/materialize/dist/fonts/**/*'
];

var jsToMinify = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/ng-facebook/ngFacebook.js',
  'bower_components/ng-file-upload/ng-file-upload.min.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/materialize/dist/js/materialize.min.js',
  'bower_components/moment/min/moment-with-locales.min.js',

  'app/js/main.js',
  'app/js/angular-main.js',
  'app/js/services/session-service.js',
  'app/js/services/auth-service.js',
  'app/js/services/posts-service.js',
  'app/js/services/facebook-service.js',
  'app/js/services/events-service.js',
  'app/js/services/profiles-service.js',
  'app/js/services/schedules-service.js',
  'app/js/controllers/login-controller.js',
  'app/js/controllers/posts-controller.js',
  'app/js/controllers/profiles-controller.js',
  'app/js/controllers/schedules-controller.js',
  'app/js/controllers/facebook-controller.js'
];

gulp.task('assets-dist', function() {
    gulp.src(jsFilesToMove)
        .pipe(gulp.dest('assets/components/js'));
    gulp.src(cssFilesToMove)
        .pipe(gulp.dest('assets/components/css'));
    gulp.src(fontsFilesToMove)
        .pipe(gulp.dest('assets/components/fonts'));
});

gulp.task('minify-js', function () {
  gulp.src(jsToMinify)
    .pipe(concat('socialcron.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('app/js'));
});
 
gulp.task('default', [ 'assets-dist', 'minify-js' ]);

gulp.task('watch', function() {
  gulp.watch(css, ['minify-js', 'minify-css']);
});