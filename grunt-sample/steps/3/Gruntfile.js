/**
 * Adds connect, livereload and watch to dynamically update compiled styles
 */

'use strict';

module.exports = function(grunt) {
	/**
	 * Load tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
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
		},
		/**
		 * styles: less files are updated --> run less
		 * livereload: less is finished --> trigger livereload
		 */
		watch: {
			styles: {
				files: ['app/styles/*.less'],
				tasks: ['less:dev']
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
		'less:dist'
	]);

	grunt.registerTask('dev', [
		'jshint',
		'less:dev',
		'connect:server',
		'watch'
	]);
};