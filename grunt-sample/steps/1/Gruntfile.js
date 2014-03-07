/**
 * This Gruntfile shows the basic configuration of loading tasks and
 * using them on files. Uses jshint for quality control and uglify to
 * minify.
 */

'use strict';

module.exports = function(grunt) {
	/**
	 * Load tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/**
	 * initialize configuration
	 */
	grunt.initConfig({
		jshint: { // task
			all: [ // target
				'app/scripts/*.js'
			]
		},
		uglify: { // task
			dist: { // target
				files: {
					'dist/scripts/main.min.js' : ['app/scripts/*.js']
				}
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'uglify']);
};