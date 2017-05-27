module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      options: {
        configFile: 'eslint.json',
        reset: true
      },

      build: ['app/client/src/*.js', 'app/client/game/*.js', 'app/server/**/*.js']
    },

		browserify: {
			build: {
				src: 'app/client/src/client.js',
				dest: 'app/client/build/client.js',
				options: {
					transform: [[
						'babelify', {
							presets: ['es2015', 'es2016']
						}
					]]
				}
			}
		},

		uglify: {
			build: {
				files: {
					'app/client/build/client.min.js': ['app/client/build/client.js']
				}
			}
		},

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'app/client/build/index.html': 'app/client/src/index.html'
        }
      }
    }

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['eslint', 'browserify', 'uglify', 'htmlmin']);

};
