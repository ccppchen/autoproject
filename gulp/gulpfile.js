'use strict';
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var pkg         = require("./package.json");
var browserSync = require('browser-sync').create();
var png         = require('imagemin-pngquant');
var clean       = require('gulp-clean');
var bowerFile   = require('main-bower-files');
var uglify      = require('gulp-uglify');
var extReplace  = require('gulp-ext-replace');
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
  return gulp.src('svgmin/*.svg')
    .pipe(svgSymbols({
      fontSize:   16
    }))
    .pipe(gulp.dest('assets'));
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
      .pipe(gulp.dest('svgmin'));
});

// iconfont
gulp.task('iconfont', function(){
  gulp.src(['svgmin/**/*.svg'])
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
  gulp.watch(yeoman.app+"/**/*.html", ['widget']);
  gulp.watch(yeoman.app+'/lib/*', ['bower-install']);
  gulp.watch([yeoman.app+'/*.html', yeoman.app+'/chenp/*.html', yeoman.app+'/compents/*.html', yeoman.app+'/js/**/*.js', yeoman.app+'/css/*.css', yeoman.app+'/lib/*']).on('change', browserSync.reload);
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
    // .pipe($.webp())
    .pipe(gulp.dest(yeoman.dist+'/css/i'));
});
gulp.task('images-min', function () {
    gulp.src([yeoman.app+'/images/**/*'])
    .pipe(cache(
      $.imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [png()]
        })
    ))
    // .pipe($.webp())
    .pipe(gulp.dest(yeoman.dist+'/images'));
});

// 删除dist
gulp.task('clean', function(){
  gulp.src('./'+yeoman.dist)
  .pipe(clean({force: true}));
});

// 导出bower的主要文件并且压缩js
gulp.task('bower-js', function() {
    gulp.src(bowerFile())
      .pipe(gulp.dest('./bower-js'))
      .pipe($.concat({ path: 'vendor.js'}))
      .pipe(uglify())
      .pipe(extReplace('.min.js'))
      .pipe(gulp.dest(yeoman.app+'/js/vendor'))
});
gulp.task('js', function(){
  gulp.src([yeoman.app+'/js/**/*.js'])
    // .pipe($.concat({ path: 'app.js' }))
    // .pipe(uglify())
    // .pipe(extReplace('.min.js'))
    .pipe(gulp.dest(yeoman.dist+'/js'))
});

// ftp
gulp.task('ftp', function(){
  gulp.src([yeoman.dist+'/**/*', '!./.svn/**/*'])
    .pipe($.ftp({
      host: "10.201.128.236",
      user: "h5ftp",
      pass: "h5ftp"
    }))
});

// imageisux
gulp.task('imageisux', function() {
    return gulp.src('app/css/i/*')
               .pipe($.imageisux('/webp/',true));
});

// webp
gulp.task('webp', function () {
    return gulp.src('app/css/i/header-title.png')
        .pipe($.webp({
          src: 'app/css/i/header-title.png',
          dest: 'webp',
          options: {}
        }))
        .pipe( gulp.dest('webp') );
});

// html
gulp.task('html', function(){
  gulp.src([yeoman.app+'/*.html', yeoman.app+'/chenp/*.html', '!./'+yeoman.app+'/widget/**/*.html'])
    .pipe($.fileInclude({
        prefix: '@@',
        basepath: 'app/'
      }))
    .pipe(gulp.dest(yeoman.dist))
});

// gulp-file-include
gulp.task('widget', function(){
  gulp.src([yeoman.app+'/*.html', yeoman.app+'/chenp/*.html', '!./'+yeoman.app+'/widget/**/*.html'])
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
gulp.task('build', ['compass-pro', 'images', 'html', 'js', 'images-min']);



