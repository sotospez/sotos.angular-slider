var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var jshint = require('gulp-jshint');
var ngTemplates = require('gulp-ng-templates');
var header = require('gulp-header');
var webserver = require('gulp-webserver');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');

var paths = {
    sass: ['./src/**/*.scss'],
    js : ['./src/**/*.js'],
    html : ['./src/**/*.html']

};
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = dd+'/'+mm+'/'+yyyy;


var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @author : pezouvanis sotiris ',
    ' * Copyright (c) '+today,
    ' */',
    ''].join('\n');


gulp.task('webserver', function() {
   return  gulp.src('./public_html')
        .pipe(plugins.webserver({
           host:'192.168.0.100',
            livereload: true,
            directoryListing: false,
            open: true   ,
            fallback: 'index.html'
        }));
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js, ['scripts']);
});


gulp.task('sass',function() {
     gutil.log("Building css files...");
    return  gulp.src(paths.sass)
        .pipe(concat(pkg.name))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 0%', 'last 2 versions' ],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.dest('./public_html/static/css/'));

});




gulp.task('scripts', function() {

    return   gulp.src(['./src/js/main.js',
            './src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter(function(data){
            gutil.beep();
        }))
        .pipe(concat(pkg.name+'.js'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.dest('./public_html/static/js/'))
        .pipe(ngmin({dynamic: false}))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.dest('./public_html/static/js/'));

});

//min vendor javascript files
// not use this time
gulp.task('vendor', function() {
    return    gulp.src(['./bower_components/angular/angular.js',
              './bower_components/angular-animate/angular-animate.js',
              './vendor/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public_html/static/js'))
        .pipe(ngmin({dynamic: false}))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./public_html/static/js/'));

});


//concat html templates files to js
gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(ngTemplates({
            module: 'sotos.tmp'
        }))
       // .pipe(ngmin({dynamic: false}))
      //  .pipe(uglify())
        .pipe(gulp.dest('./src/'));
});

// angularmin
gulp.task('angularmin', function () {
    return   gulp.src('./dist/js/'+pkg.name+'.js')
        .pipe(ngmin({dynamic: false}))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js, ['scripts']);
});




function autoprefix() {
    return autoprefixer({browsers: [
        'last 3 versions', 'last 3 Android versions'
    ]});
}


gulp.task('make', ['sass','html','scripts','angularmin']);
gulp.task('build', ['sass','html','scripts']);
gulp.task('default', ['build','webserver','watch']);