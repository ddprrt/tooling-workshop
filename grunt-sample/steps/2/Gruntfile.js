/**
 * Update: Adds LESS and shows different options for different targets, thus also
 * registers different tasks
 */

'use strict';

module.exports = function(grunt) {
	/**
	 * Load tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

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
		},
		less: {
			dist: {
				files: {
					'dist/styles/main.css' : ['app/styles/main.less']
				},
				options: {
					compress: true
				}
			},
			dev: {
				files: {
					'.tmp/styles/main.css' : ['app/styles/main.less']
				}
			}
		}
	});

	grunt.registerTask('default', [
		'jshint', 
		'uglify',
		'less:dist'
	]);

	grunt.registerTask('dev', [
		'jshint',
		'less:dev'
	]);
};