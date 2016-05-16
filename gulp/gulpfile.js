'use strict';
var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var pkg         = require("./package.json");
var browserSync = require('browser-sync').create();

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
           baseDir: "./app"
       },
       port: 8000
   });
});

gulp.task('watch', function(){
  gulp.watch("sass/**/*.scss", ['compass']);
  gulp.watch(["app/*.html", "app/styles/**/*.css", "app/images/**/*"]).on('change', browserSync.reload);
});

// 编译sass
gulp.task('compass', function() {
  return gulp.src("sass/**/*.scss")
    .pipe(plugins.compass({
      config_file: './config.rb',
      css: 'app/styles',
      sass: 'sass'
    }))
    .pipe(plugins.autoprefixer())
});

// js合并压缩混淆
gulp.task('js', function(){
  gulp.src([
      ''
    ])
    .pipe(plugins.jshint())
    .pipe(jshint.reporter())
    .pipe(plugins.concat({ path: 'main.js'}))
    .pipe(plugins.uglify())
    .pipe(plugins.extReplace('.min.js'))
    .pipe(plugins.header(banner))
    .pipe(gulp.dest("dist"))
});

// html压缩
gulp.task('html', function () {
    gulp.src('app/*.html')
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest('dist'));
});

// image压缩
gulp.task('images', function () {
    gulp.src('app/images/**/*')
    .pipe(plugins.imagemin({
        progressive: true,
        use: [plugins.imageminPngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});


gulp.task('default', ['compass', 'watch', 'server']);
gulp.task('build', ['compass', 'js', 'html', 'images', 'server']);


