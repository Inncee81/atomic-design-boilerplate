'use strict'; // Used for linting settings

/*
	Created by Summer of Dev
	Version 1.3.1 - 30/05/2014
*/

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		dist: 'live'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: config,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			gruntfile: {
				files: ['Gruntfile.js']
			},
			js: {
				files: ['<%= config.app %>/js/{,*/}*.js', '!<%= config.app %>/js/*.min.js'],
				tasks: ['jshint', 'uglify:server'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['<%= config.app %>/scss/{,*/}*.scss'],
				tasks: ['sass:server', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: 35729
				},
				files: [
					'<%= config.app %>/{,*/}*.php', // Revise for CMS implementation
					'<%= config.app %>/css/{,*/}*.css',
					'<%= config.app %>/img/{,*/}*'
				]
			}
		},

		// Copy bower files to live folder
		bowercopy: {
			options: {
				srcPrefix: '<%= config.app %>/components'
			},
			scripts: {
				options: {
					destPrefix: '<%= config.dist %>/components'
				},
				files: {
					'jquery/dist/jquery.js': 'jquery/dist/jquery.js'
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'{,*/}*.html',
						'*.{ico,png,txt}',
						'.htaccess',
						'img/{,*/}*.webp',
						'{,*/}*.php',
						'font/{,*/}*.*',
						'components/{,*/}*.*'
					]
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= config.app %>/css/',
				dest: '<%= config.dist %>/css/',
				src: '{,*/}*.css'
			},
			scripts: {
				expand: true,
				dot: true,
				cwd: '<%= config.app %>/js/',
				dest: '<%= config.dist %>/js/',
				src: '{,*/}*.min.js'
			},
			cssAsScss: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/components/normalize.css/',
					src: ['**/*.css', '!**/*.min.css'],
					dest: '<%= config.app %>/components/normalize.css/',
					filter: 'isFile',
					ext: '.scss'
				}]
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/js/{,*/}*.js',
				'!<%= config.app %>/js/*.min.js',
				'!<%= config.app %>/js/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},

		// Minify image files
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/img'
				}]
			}
		},

		// Minify SVG files
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/img'
				}]
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				includePaths: require('node-bourbon').with('bower_components')
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/scss',
					src: ['*.scss'],
					dest: '<%= config.app %>/css',
					ext: '.css'
				}],
				options: {
					outputStyle: 'compressed'
				}
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/scss',
					src: ['*.scss'],
					dest: '<%= config.app %>/css',
					ext: '.css'
				}],
				options: {
					sourceComments: 'map'
				}
			}
		},

		// Minify JS
		uglify: {
			server: {
				files: {
					'<%= config.app %>/js/site.min.js': ['<%= config.app %>/js/**/*.js', '!<%= config.app %>/js/*.min.js', '!<%= config.app %>/js/vendor/*']
				},
				options: {
					beautify: true,
					compress: false,
					mangle: false,
					preserveComments: 'all',
					sourceMap: true
				}
			},
			dist: {
				files: {
					'<%= config.app %>/js/site.min.js': ['<%= config.app %>/js/**/*.js', '!<%= config.app %>/js/*.min.js', '!<%= config.app %>/js/vendor/*']
				},
				options: {
					banner: '/*! Created by Summer of Dev - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					globalDefs: {
						'DEBUG': false
					},
					preserveComments: false
				}
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/css',
					src: '{,*/}*.css',
					dest: '<%= config.app %>/css'
				}]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			dist: [
				'sass',
				'copy:styles',
				'copy:scripts',
				'imagemin',
				'svgmin'
			]
		}

	});

	grunt.registerTask('run', function (target) {
		if (target === 'dist') {
			return grunt.task.run('build');
		}

		grunt.task.run([
			'autoprefixer',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'uglify:dist',
		'concurrent:dist',
		'autoprefixer',
		'copy:dist',
		'bowercopy'
	]);





	// Register default task
	grunt.registerTask('default', ['run']);

};
