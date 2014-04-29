module.exports = function(grunt) {

	var srcFiles = {
		utils: [
			'<%= dirs.srcUtils %>/intro.js',
			'<%= dirs.srcUtils %>/toBool.js',
			'<%= dirs.srcUtils %>/toInt.js',
			'<%= dirs.srcUtils %>/I.Class.js',
			'<%= dirs.srcUtils %>/outro.js'
		],
		shims: [
			'<%= dirs.srcShims %>/intro.js',
			'<%= dirs.srcShims %>/outro.js'
		],
		polyfills: [
			'<%= dirs.srcPolyfills %>/intro.js',
			'<%= dirs.srcPolyfills %>/Function.prototype.bind.js',
			'<%= dirs.srcPolyfills %>/outro.js'
		]
	},
	banner = [
		'/**',
		' * @license',
		' * <%= pkg.name %> - v<%= pkg.version %>',
		' * Copyright (c) 2004-2014, Inventeers',
		' * <%= pkg.homepage %>',
		' *',
		' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
		' *',
		' * <%= pkg.name %> is licensed under the <%= pkg.license %> License.',
		' * <%= pkg.licenseUrl %>',
		' */',
		''
	].join('\n');

	// Initialize grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			build: "build",
			src: "src",
			srcUtils: "<%= dirs.src %>/utils",
			srcShims: "<%= dirs.src %>/shims",
			srcPolyfills: "<%= dirs.src %>/polyfills"
		},
		files: {
			build: "<%= dirs.build %>/<%= pkg.name %>-<%= pkg.version %>.js",
			buildMin: "<%= dirs.build %>/<%= pkg.name %>-<%= pkg.version %>.min.js",
			buildUtils: "<%= dirs.build %>/utils.js",
			buildShims: "<%= dirs.build %>/shims.js",
			buildPolyfills: "<%= dirs.build %>/polyfills.js"
		},
		concat: {
			buildUtils: {
				src: srcFiles.utils,
				dest: '<%= files.buildUtils %>'
			},
			buildShims: {
				src: srcFiles.shims,
				dest: '<%= files.buildShims %>'
			},
			buildPolyfills: {
				src: srcFiles.polyfills,
				dest: '<%= files.buildPolyfills %>'
			},
			dist: {
				options: {
					banner: banner
				},
				src: ['<%= files.buildUtils %>', '<%= files.buildShims %>', '<%= files.buildPolyfills %>'],
				dest: '<%= files.build %>'
			}
		},
		uglify: {
			options: {
				banner: banner
			},
			dist: {
				src: '<%= files.build %>',
				dest: '<%= files.buildMin %>'
			}
		},
		watch: {
			scripts: {
				files: ['<%= dirs.src %>/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			}
		}
	});

	// Register grunt plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register grunt automation tasks
	grunt.registerTask('default', ['concat', 'uglify']);
};