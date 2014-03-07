'use strict';

var gulp 	= require('gulp'),
	jshint 	= require('gulp-jshint'),
	concat	= require('gulp-concat'),
	rename	= require('gulp-rename'),
	cssmin	= require('gulp-cssmin'),
	uglify	= require('gulp-uglify');

gulp.task('styles', function() {
	gulp.src('app/styles/main.scss')
		.pipe(sass())
		.pipe(cssmin())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('styles-dev', function() {
	gulp.src('app/styles/main.scss')
		.pipe(sass())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('.tmp/styles'));
});

gulp.task('test', function() {
	gulp.src('app/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default')) 	// output if everything is ok
		.pipe(jshint.reporter('fail'));		// output (and break) if something happened
})

gulp.task('scripts', ['test'], function() {
	gulp.src('app/scripts/*.js')
		.pipe(concat())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('default', ['scripts', 'styles']);

gulp.task('dev', ['test', 'styles-dev']);