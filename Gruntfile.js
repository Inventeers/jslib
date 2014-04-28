module.exports = function(grunt) {

	var srcFiles = {
		utils: [
			'intro.js',
			'outro.js'
		],
		shims: [
			'intro.js',
			'outro.js'
		],
		polyfills: [
			'intro.js',
			'outro.js'
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
			src: "src"
		},
		files: {
			build: "<%= dirs.build %>/<%= pkg.name %>-<%= pkg.version %>.js",
			buildMin: "<%= dirs.build %>/<%= pkg.name %>-<%= pkg.version %>.min.js",
			utils: "<%= dirs.build %>/utils.js",
			shims: "<%= dirs.build %>/shims.js"
			polyfills: "<%= dirs.build %>/polyfills.js"
		}
		concat: {},
		uglify: {},
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