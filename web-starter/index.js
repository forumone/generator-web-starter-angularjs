'use strict';
var generators = require('yeoman-generator'), 
  _ = require('lodash'),
  Promise = require('bluebird'),
  rp = require('request-promise'),
  semver = require('semver'),
  glob = Promise.promisify(require('glob')),
  http = require('http'),
  fs = require('fs'),
  ygp = require('yeoman-generator-bluebird');


module.exports = generators.Base.extend({
  initializing : {
    async : function() {
      ygp(this);
    },
  },
  configuring : {
    addGruntTasks : function() {
      var done = this.async();
      if(this.options.getPlugin('grunt')) {
        var editor = this.options.getPlugin('grunt').getGruntTask('bower');
        editor.insertConfig('install', this.fs.read(this.templatePath('tasks/config/bower.js')));
        editor.loadNpmTasks('grunt-bower-task');
        this.options.addDevDependency('grunt-bower-task', '^0.4.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('concat');
        editor.insertConfig('js', this.fs.read(this.templatePath('tasks/config/concat.js')));
        editor.loadNpmTasks('grunt-contrib-concat');
        this.options.addDevDependency('grunt-contrib-concat', '^1.0.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('htmlbuild');
        editor.insertConfig('dev', this.fs.read(this.templatePath('tasks/config/htmlbuild.js')));
        editor.loadNpmTasks('grunt-html-build');
        this.options.addDevDependency('grunt-html-build', '^0.5.2');

        var editor = this.options.getPlugin('grunt').getGruntTask('htmlmin');
        editor.insertConfig('options', this.fs.read(this.templatePath('tasks/config/htmlmin.js')));
        editor.loadNpmTasks('grunt-contrib-htmlmin');
        this.options.addDevDependency('grunt-contrib-htmlmin', '^1.4.0');

        var editor = this.options.getPlugin('grunt').getGruntTask('ngAnnotate');
        editor.insertConfig('options', this.fs.read(this.templatePath('tasks/config/ng-annotate-options.js')));
        editor.insertConfig('app', this.fs.read(this.templatePath('tasks/config/ng-annotate.js')));
        editor.loadNpmTasks('grunt-ng-annotate');
        this.options.addDevDependency('grunt-ng-annotate', '^2.0.2');

        var editor = this.options.getPlugin('grunt').getGruntTask('ngtemplates');
        editor.insertConfig('ngtemplates', this.fs.read(this.templatePath('tasks/config/ngtemplates.js')));
        editor.loadNpmTasks('grunt-angular-templates');
        this.options.addDevDependency('grunt-angular-templates', '^1.0.3');

        var editor = this.options.getPlugin('grunt').getGruntTask('sync');
        editor.insertConfig('build', this.fs.read(this.templatePath('tasks/config/sync-build.js')));
        editor.insertConfig('source', this.fs.read(this.templatePath('tasks/config/sync-source.js')));
        editor.loadNpmTasks('grunt-sync');
        this.options.addDevDependency('grunt-sync', '^0.5.2');

        var editor = this.options.getPlugin('grunt').getGruntTask('uglify');
        editor.insertConfig('js', this.fs.read(this.templatePath('tasks/config/uglify.js')));
        editor.loadNpmTasks('grunt-contrib-uglify');
        this.options.addDevDependency('grunt-contrib-uglify', '^1.0.1');
      }
      else {
        console.log('INFO unable to write grunt tasks for AngularJs because Grunt plugin not selected for this project');
      }
      done();
    }
  },
  writing : {
    grunt : function() {
    }
  }
});
