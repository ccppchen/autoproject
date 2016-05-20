'use strict';
var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var pkg         = require("./package.json");
var browserSync = require('browser-sync').create();
var jshint      = require('gulp-jshint');
var png         = require('imagemin-pngquant');
var clean       = require('gulp-clean');


var yeoman = {
  app: "app",
  dist: "dist"
}

var banner = 
"/** \n\
* jQuery WeUI V" + pkg.version + " \n\
* By 野草\n\
* http://ccppchen.github.io/jquery-weui/\n \
*/\n";

// 监测文件改动并自动刷新
gulp.task('server', ['compass'], function(){
  browserSync.init({
       server: {
           baseDir: yeoman.app
       },
       port: 8000
   });
});

gulp.task('watch', function(){
  gulp.watch("sass/**/*.scss", ['compass']);
  gulp.watch([yeoman.app+'/*.html', yeoman.app+'/styles/**/*.css', yeoman.app+'/images/**/*']).on('change', browserSync.reload);
});

// 编译sass
gulp.task('compass', function() {
  return gulp.src("sass/**/*.scss")
    .pipe(plugins.compass({
      config_file: './config.rb',
      css: yeoman.app+'/styles',
      sass: 'sass',
      image: yeoman.app+'/images',
      style: 'expanded',
      comments: true
    }))
    .pipe(plugins.autoprefixer({
      browsers: [ '> 5%', 'Last 2 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      remove:true
    }))
    .pipe(gulp.dest(yeoman.app+'/styles'));
});

gulp.task('compass-pro', function() {
  return gulp.src("sass/**/*.scss")
    .pipe(plugins.compass({
      css: yeoman.dist+'/styles',
      sass: 'sass',
      image: yeoman.app+'/images',
      style: 'compressed',
      comments: true
    }))
    .pipe(plugins.autoprefixer({
      browsers: [ '> 5%', 'Last 2 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      remove:true
    }))
    .pipe(plugins.header(banner))
    .pipe(gulp.dest(yeoman.dist+'/styles'));
});

// js合并压缩混淆
gulp.task('js', function(){
  gulp.src([
      "app/scripts/app.js"
    ])
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(plugins.concat({ path: 'main.js'}))
    .pipe(plugins.uglify())
    .pipe(plugins.extReplace('.min.js'))
    .pipe(plugins.header(banner))
    .pipe(gulp.dest(yeoman.dist+'/scripts'))
});

// html压缩
gulp.task('html', function () {
    gulp.src(yeoman.app+'/**/*.html')
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(yeoman.dist));
});

// image压缩
gulp.task('images', function () {
    gulp.src(yeoman.app+'/images/**/*')
    .pipe(plugins.imagemin({
        progressive: true,
        use: [png()]
    }))
    .pipe(gulp.dest(yeoman.dist+'/images'));
});

// 删除dist
gulp.task('clean', function(){
  gulp.src('./'+yeoman.dist)
  .pipe(clean({force: true}));
});


gulp.task('default', ['compass', 'watch', 'server']);
gulp.task('build', ['clean', 'compass-pro', 'js', 'html', 'images', 'server']);


