'use strict';
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var pkg         = require("./package.json");
var browserSync = require('browser-sync').create();
var png         = require('imagemin-pngquant');
var extReplace  = require('gulp-ext-replace');
var iconfontCss = require('gulp-iconfont-css-and-template');
var iconfont    = require('gulp-iconfont');
var cache       = require('gulp-cache');

var yeoman = {
  app: "app",
  dist: "dist",
  sass: 'sass'
};

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
      .pipe(gulp.dest('svgmin'));
});

// iconfont
gulp.task('iconfont', function(){
  gulp.src(['svg/**/*.svg'])
     .pipe(iconfontCss({
         glyphs:   null,
         fontName: 'blfont',
         cssClass: 'iconfont',
         cssTargetPath: './icons.css'
     }))
     .pipe(iconfont({
         fontName: 'blfont',
         formats: ['ttf']
     }))
    .pipe(gulp.dest('sass/tobe/fonts'));
});


// 监测文件改动并自动刷新
gulp.task('server', ['compass'], function(){
  browserSync.init({
       server: {
           baseDir: ['.tmp', yeoman.app, 'lib']
       },
       port: 8000
   });
});

gulp.task('watch', function(){
  gulp.watch(yeoman.sass+"/**/*.scss", ['compass']);
  gulp.watch(yeoman.app+"/*.html", ['widget']);
  gulp.watch([yeoman.app+'/*.html', yeoman.app+'/compents/*.html', yeoman.app+'/js/**/*.js', yeoman.app+'/css/*.css']).on('change', browserSync.reload);
});


// 编译sass
gulp.task('compass', function() {
  return gulp.src([yeoman.sass+"/**/*.scss", "!sass/tobe/**/_*.scss", "!sass/compents/css/*.scss"])
    .pipe($.plumber({
        errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
    }))
    .pipe($.compass({
      css:      yeoman.app+'/css',
      sass: yeoman.sass,
      image: yeoman.sass,
      style: 'compressed'
    }))
    .pipe($.autoprefixer({
      browsers: [ '> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      cascade: true
    }))
    .pipe(gulp.dest(yeoman.app+'/css'))
    
});

// 编写组件编译sass
gulp.task('doc-sass', function() {
  return gulp.src([yeoman.sass+"/components.scss"])
    .pipe($.plumber({
        errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }
    }))
    .pipe($.compass({
      css:  "app/compents/css",
      sass: "sass",
      image: yeoman.sass,
      comments: false,
      sourcemap: true
    }))
    .pipe(gulp.dest(yeoman.app+"/compents/css"))
});

// 生产
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
      image: yeoman.sass,
      style: 'compressed',
      comments: false,
      sourcemap: false,
      environment: 'production'
    }))
    .pipe($.plumber.stop())
    .pipe($.autoprefixer({
      browsers: [ '> 5%', 'Last 4 versions', 'Firefox >= 20', 'iOS 7', 'Android >= 4.0' ],
      remove: true
    }))
    .pipe(gulp.dest(yeoman.dist+'/css'));
});
// image压缩
gulp.task('images', function () {
    gulp.src([yeoman.app+'/css/i/**/*'])
    .pipe(cache(
      $.imagemin({
            optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [png()]
        })
    ))
    .pipe(gulp.dest(yeoman.dist+'/css/i'));
});
gulp.task('images-min', function () {
    gulp.src([yeoman.app+'/images/**/*'])
    .pipe(cache(
      $.imagemin({
            optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [png()]
        })
    ))
    .pipe(gulp.dest(yeoman.dist+'/images'));
});

gulp.task('js', function(){
  gulp.src([yeoman.app+'/js/**/*.js'])
    .pipe(gulp.dest(yeoman.dist+'/js'))
});

// html
gulp.task('html', function(){
  gulp.src([yeoman.app+'/*.html', '!./'+yeoman.app+'/widget/**/*.html'])
    .pipe($.fileInclude({
        prefix: '@@',
        basepath: 'app/'
      }))
    .pipe(gulp.dest(yeoman.dist))
});

// gulp-file-include
gulp.task('widget', function(){
  gulp.src([yeoman.app+'/*.html', '!./'+yeoman.app+'/widget/**/*.html'])
    .pipe($.fileInclude({
        prefix: '@@',
        basepath: 'app/',
        context: {
            rightWordBool: false
        }
      }))
    .pipe(gulp.dest('.tmp'))
});

gulp.task('default', ['compass', 'watch', 'server', 'widget']);
gulp.task('doc', ['doc-sass', 'watch', 'server']);
gulp.task('build', ['compass-pro', 'images', 'js', 'images-min', 'html']);



