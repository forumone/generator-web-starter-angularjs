var env = process.env.NODE_ENV || 'development';

module.exports = function (grunt) {
  grunt.registerTask('compileScripts', [
    'ngconstant:' + env,
    'ngtemplates',
    'ngAnnotate',
  ]);
};
