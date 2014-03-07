'use strict';

var gulp 	= require('gulp'),
	jshint 	= require('gulp-jshint'),
	concat	= require('gulp-concat'),
	rename	= require('gulp-rename'),
	uglify	= require('gulp-uglify');


gulp.task('test', function() {
	gulp.src(['app/scripts/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default')) 	// output if everything is ok
		.pipe(jshint.reporter('fail'));		// output (and break) if something happened
})

gulp.task('scripts', ['test'], function() {
	gulp.src(['app/scripts/*.js'])
		.pipe(concat())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('default', ['scripts']);
