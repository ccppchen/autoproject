'use strict';
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var pkg         = require("./package.json");
var browserSync = require('browser-sync').create();
var png         = require('imagemin-pngquant');
var clean       = require('gulp-clean');
var connect     = require("gulp-connect");
var bowerFile   = require('main-bower-files');
var uglify      = require('gulp-uglify');
var extReplace  = require('gulp-ext-replace');
var inject      = require('gulp-inject');
var svgSymbols  = require('gulp-svg-symbols');
var iconfontCss = require('gulp-iconfont-css-and-template');
var iconfont    = require('gulp-iconfont');
var cache       = require('gulp-cache');

var yeoman = {
  app: "app",
  dist: "dist",
  sass: 'sass'
};

var banner =
"/** \n\
* jQuery extend V" + pkg.version + " \n\
* By 野草\n\
* http://ccppchen.github.io\n \
*/\n";

// svg symbols
gulp.task('sprites', ['svgmin'], function () {
  return gulp.src(yeoman.app+'/svgmin/*.svg')
    .pipe(svgSymbols({
      fontSize:   16
    }))
    .pipe(gulp.dest(yeoman.app+'/assets'));
});

// svgmin
gulp.task('svgmin', function () {
    gulp.src('svg/**/*.svg')
      .pipe(cache(
        $.svgmin({
            plugins: [{
                cleanupIDs: {
                    prefix: '',
                    minify: true
                },
                js2svg: {
                  pretty: true
                }
            }]
          })
      ))
      .pipe(gulp.dest(yeoman.app+'/svgmin/'));
});

// iconfont
gulp.task('iconfont', ['svgmin'], function(){
  gulp.src([yeoman.app+'/svgmin/**/*.svg'])
     .pipe(iconfontCss({
         glyphs:   null,
         fontName: 'myfont',
         cssClass: 'iconfont',
         cssTargetPath: './icon.css'
     }))
     .pipe(iconfont({
         fontName: 'myfont',
         formats: ['ttf', 'eot', 'woff']
     }))
    .pipe(gulp.dest(yeoman.app+'/styles/fonts'));
});

// 复制
gulp.task('copy', function(){
  gulp.src(yeoman.app+'/css/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist+'/css/fonts'))
});

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
  gulp.watch(yeoman.sass+"/**/*.scss", ['compass']);
  gulp.watch(yeoman.app+'/lib/**/*', ['bower-install']);
  gulp.watch([yeoman.app+'/*.html', yeoman.app+'/js/**/*.js', yeoman.app+'/css/*.css', yeoman.app+'/lib/**']).on('change', browserSync.reload);
});

// 查看服务
gulp.task('connect', function () {
  connect.server();
});

// 编译sass
gulp.task('compass', function() {
  return gulp.src(yeoman.sass+"/**/*.scss")
    .pipe($.plumber({
        errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
    }))
    .pipe($.sourcemaps.init())
    .pipe($.compass({
      image:    yeoman.app+'/images',
      css:      yeoman.app+'/css',
      sass:     yeoman.sass,
      sourcemap: true
    }))
    .pipe($.sourcemaps.write())

    .pipe(gulp.dest(yeoman.app+'/css'))
    .pipe($.autoprefixer({
      browsers: [ '> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      cascade: true,
      remove: true
    }))
});

gulp.task('compass-pro', function() {
  return gulp.src(yeoman.sass+"/**/*.scss")
    .pipe($.plumber({
        errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
    }))
    .pipe($.compass({
      css: yeoman.dist+'/css',
      sass: yeoman.sass,
      image: yeoman.app+'/images',
      style: 'compressed',
      comments: false,
      sourcemap: false,
      environment: 'production'
    }))
    .pipe($.plumber.stop())
    .pipe($.autoprefixer({
      browsers: [ '> 5%', 'Last 2 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      remove: true
    }))
    .pipe($.header(banner))
    .pipe(gulp.dest(yeoman.dist+'/css'));
});

// html压缩
gulp.task('html', function () {
    gulp.src([yeoman.app+'/**/*.html','!./'+yeoman.app+'/widget/*.html'])
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(yeoman.dist));
});

// image压缩
gulp.task('images', function () {
    gulp.src([yeoman.app+'/css/i/**/*', '!./app/images/base64'])
    .pipe(cache(
      $.imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [png()]
        })
    ))
    .pipe(gulp.dest(yeoman.dist+'/css/i'));
});

// 删除dist
gulp.task('clean', function(){
  gulp.src('./'+yeoman.dist)
  .pipe(clean({force: true}));
});

// 导出bower的主要文件并且压缩js
gulp.task('bower-js', function() {
    gulp.src(bowerFile())
      .pipe(gulp.dest(yeoman.dist+'/lib'))
      .pipe($.concat({ path: 'vendor.js'}))
      .pipe(uglify())
      .pipe($.header(banner))
      .pipe(extReplace('.min.js'))
      .pipe(gulp.dest(yeoman.dist+'/js/vendor'))
});
gulp.task('js', function(){
  gulp.src([yeoman.app+'/js/**/*.js'])
    .pipe($.concat({ path: 'app.js' }))
    .pipe(uglify())
    .pipe($.header(banner))
    .pipe(extReplace('.min.js'))
    .pipe(gulp.dest(yeoman.dist+'/js'))
});

// bower依赖注入
gulp.task('bower-install', function(){
  gulp.src([yeoman.app+'/*.html'])
    .pipe( inject( gulp.src(bowerFile(), {read: false}), {starttag:'<!-- bower:{{ext}} -->', relative: true} ) )
    .pipe(inject( gulp.src([yeoman.app+'/js/**/*.js', yeoman.app+'/css/*.css'], {read: false}), {relative: true, name: 'inject'} ))
    .pipe(gulp.dest(yeoman.app))
});
gulp.task('inject', ['js','bower-js'], function(){
  gulp.src([yeoman.dist+'/*.html'])
    .pipe( inject( gulp.src(yeoman.dist+'/js/vendor/*.js'), {relative: true, starttag: '<!-- bower:{{ext}} -->'} ) )
    .pipe( inject( gulp.src(yeoman.dist+'/js/*.js'), {relative: true} ) )
    .pipe(gulp.dest(yeoman.dist))
});

gulp.task('default', ['compass', 'watch', 'bower-install', 'server']);
gulp.task('build', ['clean', 'bower-js', 'js', 'compass-pro', 'html', 'images', 'inject']);



