// https://npmjs.org/package/grunt-contrib 
module.exports = function(grunt) {  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>.\n' +
        ' * Licensed under the <%= pkg.license.name %> license.\n */ '
    },


    /**
     * CONCAT
     */
    concat: {
      options: {},

      scripts: {
        src: [
          'src/<%= pkg.name %>.prefix',
          'src/helpers.js',
          'src/settings.js',
          'src/<%= pkg.name %>.js',
          'src/<%= pkg.name %>.suffix'
        ],

        dest: '<%= pkg.name %>.js'
      }
    },


    /**
     * STRING REPLACE
     */
    'string-replace': {
      version: {
        files: {
          '<%= pkg.name %>.js': ['<%= pkg.name %>.js'],
          'README.md': 'README.md'
        },
        options: {
          replacements: [
            {
              pattern: '{{@VERSION}}',
              replacement: '<%= pkg.version %>'
            }
          ]
        }
      }
    },


    /** 
     * UGLIFY JS
     */
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        report: 'gzip',
        compress: true,
        drop_console: true
      },

      dist: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
        }
      }
    },

    /**
     * JSHINT
     */
    jshint: {
      options: {
        // Report JSHint errors but not fail the task
        force: true,

        // Ignore warnings
        '-W030': true, // `e && e.preventDefault()`

        globals: {
          window: true
        },

        // Enforcing
        'camelcase': true,     // Identifiers must be in camelCase
        'curly'    : true,     // Require {} for every new block or scope
        'eqeqeq'   : true,     // Require triple equals (===) for comparison
        'forin'    : true,     // Require filtering for..in loops with obj.hasOwnProperty()
        'immed'    : true,     // Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
        'indent'   : 2,        // Number of spaces to use for indentation
        'latedef'  : false,    // Require variables/functions to be defined before being used
        'newcap'   : true,     // Require capitalization of all constructor functions e.g. `new F()`
        'noempty'  : true,     // Prohibit use of empty blocks
        'plusplus' : true,     // Prohibit use of `++` & `--`
        'quotmark' : 'single', // Require single quotes
        'undef'    : true,     // Require all non-global variables to be declared (prevents global leaks)
        'unused'   : false,    // Require all defined variables be used
        'strict'   : true,     // Requires all functions run in ES5 Strict Mode
        'maxparams': 3,        // Max number of formal params allowed per function
        'maxlen'   : 100,      // Max number of characters per line

        // Relaxing
        'debug'    : true,     // Allow debugger statements e.g. browser breakpoints.
      },

      src: ['<%= pkg.name %>.js']
    },


    /**
     * Run `grunt watch` to watch files.
     */
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/<%= pkg.name %>.prefix', 'src/<%= pkg.name %>.suffix'],
        tasks: ['default'],
        options: { spawn: false }
      }
    }
  });


  /**
   * Load the Grunt plugins.
   */
  [
    'grunt-contrib-concat',
    'grunt-string-replace',
    'grunt-contrib-uglify', 
    'grunt-contrib-jshint',
    'grunt-contrib-watch'
  ].forEach(grunt.loadNpmTasks);

  // The default task.
  grunt.registerTask('default', ['concat', 'string-replace', 'uglify', 'jshint']);

};
