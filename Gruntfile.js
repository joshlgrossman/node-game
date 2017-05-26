module.exports = function(grunt) {
  grunt.initConfig({

		browserify: {
			js: {
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
			my_target: {
				files: {
					'app/client/build/client.min.js': ['app/client/build/client.js']
				}
			}
		},

    htmlmin: {
      dist: {
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

	grunt.registerTask('default', ['browserify', 'uglify', 'htmlmin']);

};
