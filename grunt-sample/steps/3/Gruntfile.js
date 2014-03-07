/**
 * Adds connect, livereload and watch to dynamically update compiled styles
 */

'use strict';

module.export = function(grunt) {
	/**
	 * Load tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

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
		},
		/**
		 * styles: scss files are updated --> run sass
		 * livereload: sass is finished --> trigger livereload
		 */
		watch: {
			styles: {
				files: ['app/styles/*.scss'],
				tasks: ['sass:dev']
			},
			livereload: {
				files: ['.tmp/styles/*'],
				options: {
					livereload: 35729
				}
			}
		},
		connect: {
			server: {
				options: {
					base: ['app','.tmp'],	// directories for the connect stack
					livereload: 35729,
					open: true,
					port: 9000,
					hostname: '0.0.0.0'		// opens site on 0.0.0.0:9000
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
		'sass:dev',
		'connect:server',
		'watch'
	]);
};