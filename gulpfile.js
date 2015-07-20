'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var AUTOPREFIXER_BROWSERS = [                 // https://github.com/ai/autoprefixer
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('clean', function(){
  return gulp.src('./assets/*', {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() {
  return gulp.src(['./src/**/*.{jsx,js}', '!./src/**/__tests__/**'])
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('./lib/js'))
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/**/*.{scss,css}')
    .pipe(gulp.dest('./lib/sass'))
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['./node_modules'],
      sourceMap: false,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(minifyCss())
    .pipe(gulp.dest('./assets/css'))
});

gulp.task('build', ['clean', 'scripts', 'styles']);

gulp.task('default', ['build']);
