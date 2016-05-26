'use strict';
var generators = require('yeoman-generator'),
  _ = require('lodash'),
  Promise = require('bluebird'),
  rp = require('request-promise'),
  semver = require('semver'),
  glob = Promise.promisify(require('glob')),
  http = require('http'),
  fs = require('fs'),
  yosay = require('yosay'),
  pkg = require('../package.json'),
  ygp = require('yeoman-generator-bluebird');


module.exports = generators.Base.extend({
  initializing : {
    async : function() {
      ygp(this);
      this.options.addDevDependency(pkg.name, pkg.version);
    },
    platform : function() {
      // Set the platform
      this.options.parent.answers.platform = 'angularjs';
    }
  },
  configuring : {
    addGruntTasks : function() {
      var done = this.async();
      if (typeof this.options.getPlugin === "function" && this.options.getPlugin('grunt')) {
        var editor = this.options.getPlugin('grunt').getGruntTask('bower');
        editor.insertConfig('bower.install', this.fs.read(this.templatePath('tasks/config/bower.js')));
        editor.loadNpmTasks('grunt-bower-task');
        this.options.addDevDependency('grunt-bower-task', '^0.4.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('concat');
        editor.insertConfig('concat', this.fs.read(this.templatePath('tasks/config/concat.js')));
        editor.loadNpmTasks('grunt-contrib-concat');
        this.options.addDevDependency('grunt-contrib-concat', '^1.0.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('htmlbuild');
        editor.insertConfig('htmlbuild.dev', this.fs.read(this.templatePath('tasks/config/htmlbuild.js')));
        editor.loadNpmTasks('grunt-html-build');
        this.options.addDevDependency('grunt-html-build', '^0.6.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('htmlmin');
        editor.insertConfig('htmlmin.options', this.fs.read(this.templatePath('tasks/config/htmlmin.js')));
        editor.loadNpmTasks('grunt-contrib-htmlmin');
        this.options.addDevDependency('grunt-contrib-htmlmin', '^1.4.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('ngAnnotate');
        editor.insertConfig('options', this.fs.read(this.templatePath('tasks/config/ng-annotate-options.js')));
        editor.insertConfig('app', this.fs.read(this.templatePath('tasks/config/ng-annotate.js')));
        editor.loadNpmTasks('grunt-ng-annotate');
        this.options.addDevDependency('grunt-ng-annotate', '^2.0.2');

        var editor = this.options.getPlugin('grunt').getGruntTask('ngconstant');
        editor.insertConfig('development', this.fs.read(this.templatePath('tasks/config/ngconstant.js')));
        editor.insertConfig('staging', this.fs.read(this.templatePath('tasks/config/ngconstant.js')));
        editor.insertConfig('production', this.fs.read(this.templatePath('tasks/config/ngconstant.js')));
        editor.loadNpmTasks('grunt-ng-constant');
        this.options.addDevDependency('grunt-ng-constant', '^2.0.1');

        var editor = this.options.getPlugin('grunt').getGruntTask('ngtemplates');
        editor.insertConfig('ngtemplates', this.fs.read(this.templatePath('tasks/config/ngtemplates.js')));
        editor.loadNpmTasks('grunt-angular-templates');
        this.options.addDevDependency('grunt-angular-templates', '^1.0.3');

        var editor = this.options.getPlugin('grunt').getGruntTask('sync');
        editor.insertConfig('sync.build', this.fs.read(this.templatePath('tasks/config/sync-build.js')));
        editor.insertConfig('sync.source', this.fs.read(this.templatePath('tasks/config/sync-source.js')));
        editor.loadNpmTasks('grunt-sync');
        this.options.addDevDependency('grunt-sync', '^0.5.2');

        var editor = this.options.getPlugin('grunt').getGruntTask('uglify');
        editor.insertConfig('js', this.fs.read(this.templatePath('tasks/config/uglify.js')));
        editor.loadNpmTasks('grunt-contrib-uglify');
        this.options.addDevDependency('grunt-contrib-uglify', '^1.0.1');
      }
      else {
        this.log('INFO unable to write grunt tasks for AngularJs because Grunt plugin not selected for this project');
      }
      done();
    }
  },
  writing : {
    grunt : function() {
      var done = this.async();
      if (typeof this.options.getPlugin === "function" && this.options.getPlugin('grunt')) {
        this.options.getPlugin('grunt').registerTask('default', [{
          task : 'build',
          priority : 1
        },
        {
          task : 'connect',
          priority : 2
        },
        {
          task : 'watch',
          priority : 3
        }]);
        this.options.getPlugin('grunt').registerTask('build', [{
          task : 'bower',
          priority : 1
        },
        {
          task : 'compileAssets',
          priority : 2
        },
        {
          task : 'htmlbuild',
          priority : 3
        }]);
        this.options.getPlugin('grunt').registerTask('compileAssets', [{
          task : 'sync:source',
          priority : 1
        },
        {
          task : 'sync:build',
          priority : 2
        }]);
        var gruntEditor = this.options.getPlugin('grunt').registerTask('compileScripts', [{
          task : 'ngtemplates',
          priority : 1
        },
        {
          task : 'ngAnnotate',
          priority : 2
        }]);
        // useful if you want to add ngconstant
        gruntEditor.prependJavaScript("var env = process.env.NODE_ENV || 'development';");

        this.fs.copy(
            this.templatePath('tasks/pipeline.js'),
            this.destinationPath('tasks/pipeline.js')
        );
      }
      this.fs.copyTpl(
          this.templatePath('bower.json'),
          this.destinationPath('bower.json'),
          this.options.parent.answers
        );
      done();
    }
  },
  end : {
    ncu : function() {
      this.log(yosay("Run 'ncu -u' to update your package.json"));
    }
  }
});
