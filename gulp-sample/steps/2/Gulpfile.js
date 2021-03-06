'use strict';

var gulp 	= require('gulp'),
	jshint 	= require('gulp-jshint'),
	concat	= require('gulp-concat'),
	cssmin	= require('gulp-cssmin'),
	less	= require('gulp-less'),
	uglify	= require('gulp-uglify');

gulp.task('styles', function() {
	return gulp.src('app/styles/main.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('styles-dev', function() {
	return gulp.src('app/styles/main.less')
		.pipe(less())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('.tmp/styles'));
});

gulp.task('test', function() {
	return gulp.src('app/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default')) 	// output if everything is ok
		.pipe(jshint.reporter('fail'));		// output (and break) if something happened
})

gulp.task('scripts', ['test'], function() {
	return gulp.src('app/scripts/*.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('default', ['scripts', 'styles']);

gulp.task('dev', ['test', 'styles-dev']);