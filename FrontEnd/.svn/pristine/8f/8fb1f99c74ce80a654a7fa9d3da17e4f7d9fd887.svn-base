var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sh = require('shelljs');

var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var uglify = require('gulp-uglify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var css2js = require("gulp-css2js");
var ngannotate = require("gulp-ng-annotate");
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var paths = {
    sass    : ['./scss/**/*.scss'],
    html    : ['./www/app/**/*.html'],
    js      : ['./www/app/**/*.module.js', './www/app/**/*.js'],
    css     : ['./www/app/**/*.css'],
    bundle  : ['./dist/app.style.js', './dist/app.templates.js', './dist/app.min.js']
};

// make app bundle
gulp.task('make-js', function () {
    return gulp.src(paths.js)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/'));
});
gulp.task('css2js', function () {
    return gulp.src(paths.css)
        .pipe(css2js())
        .pipe(concat("app.style.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task('html2js', function () {
    return gulp.src(paths.html)
        .pipe(minifyHtml())
        .pipe(ngHtml2Js({
          moduleName: "app.templates",
          prefix: "app/"
        }))
        .pipe(concat("app.templates.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/"));
});
gulp.task('concat', function () {
    return gulp.src(paths.bundle)
        .pipe(concat('app.bundle.js'))
        .pipe(gulp.dest('dist/'));
});
gulp.task('del', function () {
    del(['dist/*']);
});
gulp.task('make-bundle', ['del', 'html2js', 'css2js', 'make-js'], function () {
    gulp.src(paths.bundle)
      .pipe(concat('app.bundle.js'))
      .pipe(gulp.dest('dist/'))
      .on('end', function(){
            gulp.src('./dist/app.bundle.js')
            .pipe(concat('app.bundle.js'))
            .pipe(plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
                gutil.beep();
                process.exit(1);
            }}))
            .pipe(ngannotate())
            .pipe(uglify().on('error', console.log))
            .pipe(gulp.dest('dist/bundle/'));
      });
});
// end make app bundle

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
