/**
 * Update: Adds Sass and shows different options for different targets, thus also
 * registers different tasks
 */

'use strict';

module.exports = function(grunt) {
	/**
	 * Load tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

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
		sass: {
			dist: {
				files: {
					'dist/styles/main.css' : ['app/styles/main.scss']
				},
				options: {
					style: 'compressed'
				}
			},
			dev: {
				files: {
					'.tmp/styles/main.css' : ['app/styles/main.scss']
				},
				options: {
					style: 'expanded',
					debugInfo: true
				}
			}
		}
	});

	grunt.registerTask('default', [
		'jshint', 
		'uglify',
		'sass:dist'
	]);

	grunt.registerTask('dev', [
		'jshint',
		'sass:dev'
	]);
};