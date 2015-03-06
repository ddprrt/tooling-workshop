'use strict';

var gulp 	= require('gulp'),
	jshint 	= require('gulp-jshint'),
	concat	= require('gulp-concat'),
	less 	= require('gulp-less'),
	rename	= require('gulp-rename'),
	cssmin	= require('gulp-cssmin'),
	uglify	= require('gulp-uglify'),
	connect	= require('gulp-connect');

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
		.pipe(concat())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('server', connect.server({
	root: ['app','.tmp'],
	host: '0.0.0.0',
	port: 9000,
	livereload: true
}));

gulp.task('reload', function() {
	gulp.src('.tmp/styles/*.css')
		.pipe(connect.reload());
});

gulp.task('default', ['scripts', 'styles']);

gulp.task('dev', ['test', 'styles-dev', 'server'], function() {
	gulp.watch('.tmp/styles/**/*.css', ['reload']);
	gulp.watch('app/styles/main.less', ['styles-dev']);
});