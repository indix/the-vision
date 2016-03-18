'use strict';

// var gulp = require('gulp');
// var merge = require('merge-stream');
// var runSequence = require('gulp-run-sequence');
// var react = require('gulp-react');
// var clean = require('gulp-clean');
// var sass = require('gulp-sass');
// var plumber = require('gulp-plumber');
// var autoprefixer = require('gulp-autoprefixer');
// var minifyCss = require('gulp-minify-css');
// var AUTOPREFIXER_BROWSERS = [                 // https://github.com/ai/autoprefixer
//   'ie >= 10',
//   'ie_mob >= 10',
//   'ff >= 30',
//   'chrome >= 34',
//   'safari >= 7',
//   'opera >= 23',
//   'ios >= 7',
//   'android >= 4.4',
//   'bb >= 10'
// ];
//
// gulp.task('clean', function(){
//   return gulp.src(['./assets/*', './lib/*/lib/*'], {read: false})
//     .pipe(clean());
// });
//
// gulp.task('scripts', function() {
//   return gulp.src(['./lib/js/**/*.{jsx,js}', '!./lib/js/**/__tests__/**'])
//     .pipe(react({harmony: true}))
//     .pipe(gulp.dest('./assets/js'))
// });
//
// gulp.task('styles', function() {
//   return gulp.src('./lib/sass/**/*.{scss,css}')
//     .pipe(plumber())
//     .pipe(sass({
//       // includePaths: ['./node_modules'],
//       sourceMap: false,
//       sourceMapBasepath: __dirname
//     }))
//     .on('error', console.error.bind(console))
//     .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
//     .pipe(minifyCss())
//     .pipe(gulp.dest('./assets/css'))
// });
//
// gulp.task('dependencies', function(){
//   return merge(
//     gulp.src('./node_modules/bootstrap-sass/assets/javascripts/bootstrap/**/*').pipe(gulp.dest('./lib/js/lib/bootstrap')),
//     gulp.src('./node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**/*').pipe(gulp.dest('./lib/sass/lib/bootstrap'))
//   );
// });
//
// gulp.task('build', function(cb){
//   runSequence('clean', 'dependencies', ['scripts', 'styles'], cb);
// });
//
// gulp.task('default', ['build']);

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);
