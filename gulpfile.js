'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var clean = require('gulp-clean');

gulp.task('clean', function(){
  return gulp.src('./lib/*', {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src(['./src/**/*.{jsx,js}', '!./src/**/__tests__/**'])
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('./lib'))
});

gulp.task('build', ['clean', 'scripts']);

gulp.task('default', ['build']);
