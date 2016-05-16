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
  writing : {
    grunt : function() {
    }
  }
});
