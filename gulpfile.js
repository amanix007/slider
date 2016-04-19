'use strict';
var gulp = require('gulp'),
pug = require('gulp-pug'),
sass = require('gulp-sass'),
connect = require('gulp-connect');


var env = process.env.NODE_ENV || 'development';
var outputDir = './';



gulp.task('build', function build() {
  return gulp.src('pug/**.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./'))
	.pipe(connect.reload());
});

gulp.task('sass', function(){
	var config = {};
	if (env === 'development') {
		config.sourceComments = 'map';
	};
	if (env === 'production') {
		config.outputStyle = "compressed"
	};

	return gulp.src('sass/main.scss')
	.pipe(sass(config))
	.pipe(gulp.dest(outputDir + '/css'))
	.pipe(connect.reload());

});

gulp.task('js', function build() {
  return gulp.src('./*.js')
	.pipe(connect.reload());
});


gulp.task('watch', function(){
	gulp.watch('pug/*.pug', ['build']);
	gulp.watch('./*.js', ['js']);
	gulp.watch('./*.scss', ['sass']);

});


gulp.task('connect', function() {
    return connect.server({
        root: ['./'],
        port: 8888, // optional
        livereload: true
    });
});

// well just testing..

gulp.task('default', ['build', 'sass', 'js', 'watch', 'connect']);