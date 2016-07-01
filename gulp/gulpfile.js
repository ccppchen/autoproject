'use strict';
var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var pkg         = require("./package.json");
var browserSync = require('browser-sync').create();
var jshint      = require('gulp-jshint');
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
  return gulp.src('app/svgmin/*.svg')
    .pipe(svgSymbols({
      fontSize:   16
    }))
    .pipe(gulp.dest('app/assets'));
});

// svgmin
gulp.task('svgmin', function () {
    gulp.src('svg/**/*.svg')
      .pipe(cache(
        plugins.svgmin({
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
      .pipe(gulp.dest('app/svgmin/'));
});

// iconfont
gulp.task('iconfont', ['svgmin'], function(){
  gulp.src(['app/svgmin/**/*.svg'])
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
    .pipe(gulp.dest('app/styles/fonts'));
});

// 复制
gulp.task('copy', function(){
  gulp.src(yeoman.app+'/styles/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist+'/styles/fonts'))
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
  gulp.watch([yeoman.app+'/*.html', yeoman.app+'/scripts/**/*.js', yeoman.app+'/styles/**/*.css', yeoman.app+'/lib/**']).on('change', browserSync.reload);
});

// 查看服务
gulp.task('connect', function () {
  connect.server();
});

// 编译sass
gulp.task('compass', function() {
  return gulp.src(yeoman.sass+"/**/*.scss")
    .pipe(plugins.plumber({
        errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
    }))
    .pipe(plugins.compass({
      image:    'app/images',
      css:      'app/css',
      sass:     yeoman.sass,
      style:    'compressed',
      comments:  true,
      sourcemap: true
    }))
    .pipe(plugins.plumber.stop())
    .pipe(plugins.autoprefixer({
      browsers: [ '> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ]
    }))
    .pipe(gulp.dest('app/css'))
});

gulp.task('compass-pro', function() {
  return gulp.src(yeoman.sass+"/**/*.scss")
    .pipe(plugins.plumber({
        errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
    }))
    .pipe(plugins.compass({
      css: yeoman.dist+'/css',
      sass: yeoman.sass,
      image: yeoman.app+'/images',
      style: 'compressed',
      comments: false,
      sourcemap: false,
      environment: 'production'
    }))
    .pipe(plugins.plumber.stop())
    .pipe(plugins.autoprefixer({
      browsers: [ '> 5%', 'Last 2 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      remove: true
    }))
    .pipe(plugins.header(banner))
    .pipe(gulp.dest(yeoman.dist+'/styles'));
});

// html压缩
gulp.task('html', function () {
    gulp.src([yeoman.app+'/**/*.html','!./'+yeoman.app+'/widget/*.html'])
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(yeoman.dist));
});

// image压缩
gulp.task('images', function () {
    gulp.src([yeoman.app+'/css/i/**/*', '!./app/images/base64'])
    .pipe(cache(
      plugins.imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [png()]
        })
    ))
    .pipe(gulp.dest(yeoman.dist+'/images'));
});

// 删除dist
gulp.task('clean', function(){
  gulp.src('./'+yeoman.dist)
  .pipe(clean({force: true}));
});

// ejs html模版引擎
gulp.task('ejs', function () {
  gulp.src([yeoman.app+"/widget/index.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest(yeoman.app));
});

// 导出bower的主要文件并且压缩js
gulp.task('bower-js', function() {
    gulp.src(bowerFile())
      .pipe(gulp.dest(yeoman.dist+'/lib'))
      .pipe(plugins.concat({ path: 'vendor.js'}))
      .pipe(uglify())
      .pipe(plugins.header(banner))
      .pipe(extReplace('.min.js'))
      .pipe(gulp.dest(yeoman.dist+'/scripts/vendor'))
});
gulp.task('js', function(){
  gulp.src([yeoman.app+'/scripts/**/*.js'])
    .pipe(plugins.concat({ path: 'app.js' }))
    .pipe(uglify())
    .pipe(plugins.header(banner))
    .pipe(extReplace('.min.js'))
    .pipe(gulp.dest(yeoman.dist+'/scripts'))
});

// bower依赖注入
gulp.task('bower-install', function(){
  gulp.src([yeoman.app+'/*.html'])
    .pipe( inject( gulp.src(bowerFile(), {read: false}), {starttag:'<!-- bower:{{ext}} -->', relative: true} ) )
    .pipe(inject( gulp.src(['app/scripts/**/*.js', 'app/css/*.css'], {read: false}), {relative: true, name: 'inject'} ))
    .pipe(gulp.dest(yeoman.app))
});
gulp.task('inject', ['js','bower-js'], function(){
  gulp.src([yeoman.dist+'/*.html'])
    .pipe( inject( gulp.src(yeoman.dist+'/scripts/vendor/*.js'), {relative: true, starttag: '<!-- bower:{{ext}} -->'} ) )
    .pipe( inject( gulp.src(yeoman.dist+'/scripts/*.js'), {relative: true} ) )
    .pipe(gulp.dest(yeoman.dist))
});

gulp.task('default', ['compass', 'watch', 'bower-install', 'server']);
gulp.task('build', ['clean', 'bower-js', 'js', 'compass-pro', 'html', 'images', 'inject']);



